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
});
