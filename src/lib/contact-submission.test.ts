import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BrevoContactSubmissionProvider, escapeHtml, generateSubmissionReference, getContactProviderReadiness, parseRecipientList, safeHeaderValue, safePublicFallbackUrl, submitContactEnquiry, type ContactSubmissionProvider } from "./contact-submission";

const original = { ...process.env };
const general = { type: "general" as const, sourceRoute: "/contact", values: { fullName: "Ada Person", email: "ada@example.com", organisation: "Example Institute", enquiryType: "General question", message: "A sufficiently complete general enquiry message.", privacyAcknowledgement: true, sourceRoute: "/contact" } };
const emergency = { type: "emergency" as const, sourceRoute: "/support/emergency", values: { fullName: "Ada Person", email: "ada@example.com", organisation: "Example Institute", urgentPhone: "+234 800 000 0000", affectedService: "Journal platform", outageStatus: "Fully unavailable", securityIncident: "Unknown", publicationBlocking: "Yes", incidentBegan: "Today at 09:00", incidentSummary: "The production journal platform is unavailable to all editors.", chargeableAcknowledgement: true, privacyAcknowledgement: true, sourceRoute: "/support/emergency" } };

function configure() {
  Object.assign(process.env, { CONTACT_SUBMISSION_PROVIDER: "mock", CONTACT_FROM_EMAIL: "verified@example.com", CONTACT_FROM_NAME: "Airix Media", CONTACT_GENERAL_RECIPIENTS: "general@example.com", CONTACT_PROJECT_RECIPIENTS: "project@example.com", CONTACT_PUBLISHING_RECIPIENTS: "publishing@example.com", CONTACT_BOOKING_RECIPIENTS: "booking@example.com", CONTACT_SUPPORT_RECIPIENTS: "support@example.com", CONTACT_REPLY_TO_MODE: "requester", EMERGENCY_ESCALATION_PROVIDER: "mock", EMERGENCY_RECIPIENTS: "emergency@example.com", EMERGENCY_ACKNOWLEDGEMENT_ENABLED: "false", EMERGENCY_PUBLIC_FALLBACK_MESSAGE: "Use the verified client portal." });
}

beforeEach(configure);
afterEach(() => { process.env = { ...original }; vi.restoreAllMocks(); });

describe("contact delivery configuration", () => {
  it("parses and validates recipient lists without inventing defaults", () => {
    expect(parseRecipientList("One@Example.com; two@example.com")).toEqual({ valid: true, recipients: [{ email: "one@example.com" }, { email: "two@example.com" }] });
    expect(parseRecipientList("valid@example.com,not-an-email").valid).toBe(false);
    expect(parseRecipientList(undefined).recipients).toEqual([]);
  });

  it("reports logical readiness without secrets or recipient values", () => {
    const readiness = getContactProviderReadiness();
    expect(readiness.ready).toBe(true);
    expect(JSON.stringify(readiness)).not.toContain("general@example.com");
    delete process.env.CONTACT_PROJECT_RECIPIENTS;
    expect(getContactProviderReadiness().ready).toBe(false);
  });

  it("escapes fields and strips header injection", () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    expect(safeHeaderValue("Institute\r\nBcc: attacker@example.com")).toBe("Institute Bcc: attacker@example.com");
  });

  it("accepts only safe HTTPS or mailto public fallback URLs", () => {
    expect(safePublicFallbackUrl("mailto:operations@airixmedia.com?subject=Emergency%20Support%20Fallback")).toContain("mailto:operations@airixmedia.com");
    expect(safePublicFallbackUrl("https://portal.airixmedia.com/emergency")).toBe("https://portal.airixmedia.com/emergency");
    expect(safePublicFallbackUrl("javascript:alert(1)")).toBeUndefined();
    expect(safePublicFallbackUrl("mailto:not-an-email")).toBeUndefined();
    expect(safePublicFallbackUrl("mailto:operations@airixmedia.com?bcc=attacker@example.com")).toBeUndefined();
    expect(safePublicFallbackUrl("mailto:operations@airixmedia.com?subject=Emergency%0d%0aBcc%3Aattacker%40example.com")).toBeUndefined();
  });

  it("generates collision-resistant form-specific references", () => {
    const values = new Set(Array.from({ length: 100 }, () => generateSubmissionReference("project")));
    expect(values.size).toBe(100);
    expect([...values][0]).toMatch(/^AM-PROJ-[A-Z0-9_-]{12}$/);
  });
});

describe("providers and routing", () => {
  it("routes a general enquiry and exposes only a safe confirmation", async () => {
    const deliver = vi.fn().mockResolvedValue({ ok: true, requestId: "safe-id" });
    const provider = { name: "mock" as const, deliver } satisfies ContactSubmissionProvider;
    const result = await submitContactEnquiry(general, provider);
    expect(result).toMatchObject({ ok: true, provider: "mock" });
    expect(deliver.mock.calls[0][0].to).toEqual([{ email: "general@example.com" }]);
    expect(deliver.mock.calls[0][0].replyTo).toEqual({ email: "ada@example.com" });
    expect(JSON.stringify(result)).not.toContain("general@example.com");
  });

  it("fails closed for missing configuration", async () => {
    delete process.env.CONTACT_GENERAL_RECIPIENTS;
    await expect(submitContactEnquiry(general)).resolves.toMatchObject({ ok: false, code: "provider_not_configured" });
  });

  it("rejects unapproved provider selection", async () => {
    process.env.CONTACT_SUBMISSION_PROVIDER = "invented-provider";
    await expect(submitContactEnquiry(general)).resolves.toMatchObject({ ok: false, code: "provider_not_supported" });
  });

  it("routes every ordinary form to its independent logical group", async () => {
    const expected = { project: "project@example.com", publishing: "publishing@example.com", book: "booking@example.com", general: "general@example.com", support: "support@example.com" } as const;
    for (const [type, recipient] of Object.entries(expected)) {
      const deliver = vi.fn().mockResolvedValue({ ok: true, requestId: "safe-id" });
      await submitContactEnquiry({ ...general, type: type as keyof typeof expected }, { name: "mock", deliver });
      expect(deliver.mock.calls[0][0].to).toEqual([{ email: recipient }]);
    }
  });

  it("accepts a valid Brevo 201 response", async () => {
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ messageId: "brevo-safe-id" }), { status: 201 }));
    const provider = new BrevoContactSubmissionProvider("secret-key", request);
    await expect(provider.deliver({ sender: { email: "a@example.com", name: "Airix" }, to: [{ email: "b@example.com" }], subject: "Test", textContent: "Text", htmlContent: "<p>Text</p>" })).resolves.toEqual({ ok: true, requestId: "brevo-safe-id" });
  });

  it.each([401, 500])("maps Brevo HTTP %s rejection without returning its body", async (status) => {
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "private provider detail" }), { status }));
    const provider = new BrevoContactSubmissionProvider("secret-key", request);
    await expect(provider.deliver({ sender: { email: "a@example.com", name: "Airix" }, to: [{ email: "b@example.com" }], subject: "Test", textContent: "Text", htmlContent: "<p>Text</p>" })).resolves.toMatchObject({ ok: false });
  });

  it("rejects a malformed successful Brevo response", async () => {
    const request = vi.fn().mockResolvedValue(new Response("{}", { status: 201 }));
    const provider = new BrevoContactSubmissionProvider("secret-key", request);
    await expect(provider.deliver({ sender: { email: "a@example.com", name: "Airix" }, to: [{ email: "b@example.com" }], subject: "Test", textContent: "Text", htmlContent: "<p>Text</p>" })).resolves.toEqual({ ok: false, category: "malformed" });
  });

  it("maps a provider timeout", async () => {
    const request = vi.fn().mockRejectedValue(Object.assign(new Error("aborted"), { name: "AbortError" }));
    const provider = new BrevoContactSubmissionProvider("secret-key", request);
    await expect(provider.deliver({ sender: { email: "a@example.com", name: "Airix" }, to: [{ email: "b@example.com" }], subject: "Test", textContent: "Text", htmlContent: "<p>Text</p>" })).resolves.toEqual({ ok: false, category: "timeout" });
  });

  it("uses emergency fallback recipients only after primary failure", async () => {
    process.env.EMERGENCY_FALLBACK_RECIPIENTS = "fallback@example.com";
    process.env.EMERGENCY_PUBLIC_FALLBACK_MESSAGE = "Use the verified client portal if continuity requires immediate action.";
    const deliver = vi.fn().mockResolvedValueOnce({ ok: false, category: "rejected" }).mockResolvedValueOnce({ ok: true, requestId: "fallback-id" });
    const result = await submitContactEnquiry(emergency, { name: "mock", deliver });
    expect(result).toMatchObject({ ok: true, usedFallback: true, message: expect.stringContaining("through the fallback route") });
    expect(deliver.mock.calls[0][0].to).toEqual([{ email: "emergency@example.com" }]);
    expect(deliver.mock.calls[1][0].to).toEqual([{ email: "fallback@example.com" }]);
  });

  it("adds a prominent no-action marker to staging subjects", async () => {
    process.env.APP_ENVIRONMENT = "staging";
    const deliver = vi.fn().mockResolvedValue({ ok: true, requestId: "safe-id" });
    await submitContactEnquiry(general, { name: "mock", deliver });
    expect(deliver.mock.calls[0][0].subject).toMatch(/^\[STAGING TEST — NO ACTION REQUIRED\]/);
  });

  it("fails truthfully when no emergency route exists", async () => {
    delete process.env.EMERGENCY_RECIPIENTS;
    await expect(submitContactEnquiry(emergency)).resolves.toMatchObject({ ok: false, code: "provider_not_configured", message: expect.stringContaining("has not been sent") });
  });

  it("rejects attachment metadata rather than discarding bytes", async () => {
    await expect(submitContactEnquiry({ ...general, attachment: { name: "evidence.pdf", type: "application/pdf", size: 10 } })).resolves.toMatchObject({ ok: false, code: "attachment_unsupported" });
  });
});
