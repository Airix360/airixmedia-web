import { describe, expect, it } from "vitest";
import { contactFormDefinitions, contactFormKeys, isContactFormKey, validateContactForm } from "./contact-forms";
import { submitContactEnquiry } from "./contact-submission";

describe("contact form architecture", () => {
  it("defines six purpose-specific forms with privacy acknowledgement", () => {
    expect(contactFormKeys).toHaveLength(6);
    for (const key of contactFormKeys) expect(contactFormDefinitions[key].fields.some((field) => field.name === "privacyAcknowledgement")).toBe(true);
  });

  it("accepts only supported URL form keys", () => {
    expect(isContactFormKey("project")).toBe(true);
    expect(isContactFormKey("emergency")).toBe(true);
    expect(isContactFormKey("invalid")).toBe(false);
    expect(isContactFormKey(null)).toBe(false);
  });

  it("returns associated field errors instead of accepting empty forms", () => {
    const result = validateContactForm("general", {});
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors).toHaveProperty("email");
  });

  it("does not report a submission as sent without a configured provider", async () => {
    const previous = process.env.CONTACT_SUBMISSION_PROVIDER;
    delete process.env.CONTACT_SUBMISSION_PROVIDER;
    const result = await submitContactEnquiry({ type: "general", sourceRoute: "/contact", values: {} });
    expect(result).toMatchObject({ ok: false, code: "provider_not_configured" });
    if (previous) process.env.CONTACT_SUBMISSION_PROVIDER = previous;
  });

  it("rejects header injection, invalid URLs, phones, dates and oversized messages", () => {
    expect(validateContactForm("general", { fullName: "Ada\r\nBcc: x@example.com", email: "ada@example.com", organisation: "Airix", enquiryType: "Other", message: "This is a sufficiently complete general enquiry message.", privacyAcknowledgement: true, sourceRoute: "/contact" }).success).toBe(false);
    expect(validateContactForm("publishing", { fullName: "Ada Person", email: "ada@example.com", organisation: "Institute", journalName: "Journal", journalUrl: "javascript:alert(1)", ojsVersion: "3.4", journalCount: "1", serviceRequired: "OJS setup", hostingArrangement: "Existing host", migrationRequired: "No", desiredLaunchDate: "This year", objective: "A sufficiently complete publishing objective.", privacyAcknowledgement: true, sourceRoute: "/contact" }).success).toBe(false);
    expect(validateContactForm("emergency", { fullName: "Ada Person", email: "ada@example.com", organisation: "Institute", urgentPhone: "call me now!", affectedService: "OJS", outageStatus: "Fully unavailable", securityIncident: "Unknown", publicationBlocking: "Yes", incidentBegan: "Now", incidentSummary: "A sufficiently complete incident summary for validation.", chargeableAcknowledgement: true, privacyAcknowledgement: true, sourceRoute: "/support/emergency" }).success).toBe(false);
    expect(validateContactForm("general", { fullName: "Ada Person", email: "ada@example.com", organisation: "Airix", enquiryType: "Other", message: "x".repeat(5001), privacyAcknowledgement: true, sourceRoute: "/contact" }).success).toBe(false);
  });
});
