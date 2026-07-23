import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetContactRateLimits } from "@/lib/contact-rate-limit";
import { POST } from "./route";

const original = { ...process.env };
function configure() {
  Object.assign(process.env, { CONTACT_SUBMISSION_PROVIDER: "mock", CONTACT_FROM_EMAIL: "verified@example.com", CONTACT_FROM_NAME: "Airix Media", CONTACT_GENERAL_RECIPIENTS: "general@example.com", CONTACT_PROJECT_RECIPIENTS: "project@example.com", CONTACT_PUBLISHING_RECIPIENTS: "publishing@example.com", CONTACT_BOOKING_RECIPIENTS: "booking@example.com", CONTACT_SUPPORT_RECIPIENTS: "support@example.com", CONTACT_REPLY_TO_MODE: "requester", EMERGENCY_ESCALATION_PROVIDER: "mock", EMERGENCY_RECIPIENTS: "emergency@example.com", EMERGENCY_ACKNOWLEDGEMENT_ENABLED: "false", EMERGENCY_PUBLIC_FALLBACK_MESSAGE: "Use the verified direct channel." });
}
function request(data: Record<string, string | Blob>, headers: Record<string, string> = {}) {
  const body = new FormData(); Object.entries(data).forEach(([key, value]) => body.set(key, value));
  return new Request("http://airix.test/api/leads", { method: "POST", body, headers: { host: "airix.test", origin: "http://airix.test", "cf-connecting-ip": "192.0.2.10", ...headers } });
}
const valid = { selectedForm: "general", fullName: "Ada Person", email: "ada@example.com", organisation: "Example Institute", enquiryType: "General question", message: "A sufficiently complete general enquiry message.", privacyAcknowledgement: "true", sourceRoute: "/contact" };

beforeEach(() => { configure(); resetContactRateLimits(); });
afterEach(() => { process.env = { ...original }; });

describe("POST /api/leads", () => {
  it("returns a reference only after mock provider acceptance", async () => {
    const response = await POST(request(valid));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ ok: true, reference: expect.stringMatching(/^AM-GEN-/), message: expect.stringContaining("Enquiry delivered") });
  });
  it("retains same-origin and honeypot rejection", async () => {
    expect((await POST(request(valid, { origin: "https://attacker.example" }))).status).toBe(403);
    expect((await POST(request({ ...valid, website: "spam" }))).status).toBe(400);
  });
  it("rejects files explicitly instead of discarding bytes", async () => {
    const form = new FormData(); Object.entries(valid).forEach(([key, value]) => form.set(key, value)); form.set("attachment", new File(["hello"], "evidence.txt", { type: "text/plain" }));
    const response = await POST({ headers: new Headers({ host: "airix.test", origin: "http://airix.test", "cf-connecting-ip": "192.0.2.10" }), formData: async () => form } as Request);
    expect(response.status).toBe(415);
    const body = await response.json();
    expect(body.code, JSON.stringify(body)).toBe("attachment_unsupported");
  });
  it("returns 429 without exposing limiter internals", async () => {
    process.env.CONTACT_RATE_LIMIT_MAX = "1";
    expect((await POST(request(valid))).status).toBe(200);
    const limited = await POST(request(valid));
    expect(limited.status).toBe(429);
    await expect(limited.json()).resolves.toMatchObject({ ok: false, code: "rate_limited" });
  });
});
