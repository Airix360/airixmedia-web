import { describe, expect, it } from "vitest";
import {
  BrevoContactSubmissionProvider,
  submitContactEnquiry,
  type ContactSubmissionProvider,
} from "./contact-submission";

const runLive = process.env.RUN_LIVE_BREVO_VERIFICATION === "true";

function emergencySubmission() {
  return {
    type: "emergency" as const,
    sourceRoute: "/support/emergency",
    values: {
      fullName: "Airix Atlas Staging Test",
      email: process.env.LIVE_VERIFICATION_REQUESTER_EMAIL!,
      organisation: "Airix Media Internal Verification",
      urgentPhone: "+234 800 000 0000",
      affectedService: "Airix Media staging verification",
      outageStatus: "Unknown",
      securityIncident: "No",
      publicationBlocking: "Not applicable",
      incidentBegan: "Controlled verification window",
      incidentSummary: "Synthetic emergency verification. No incident exists and no action is required.",
      chargeableAcknowledgement: true,
      privacyAcknowledgement: true,
    },
  };
}

describe.skipIf(!runLive)("controlled live Brevo verification", () => {
  it("delivers a primary emergency request through the real provider", async () => {
    expect(process.env.APP_ENVIRONMENT).toBe("staging");
    expect(process.env.BREVO_API_KEY).toBeTruthy();
    expect(process.env.LIVE_VERIFICATION_REQUESTER_EMAIL).toBeTruthy();

    const result = await submitContactEnquiry(
      emergencySubmission(),
      new BrevoContactSubmissionProvider(process.env.BREVO_API_KEY!),
    );

    expect(result).toMatchObject({
      ok: true,
      provider: "brevo",
    });
    if (result.ok) {
      expect(result.usedFallback).toBeFalsy();
      expect(result.reference).toMatch(/^AM-EMG-[A-Z0-9_-]{12}$/);
      expect(result.message).not.toContain("through the fallback route");
      expect(result.message).toContain("does not mean that the incident has been accepted, assigned or seen");
    }
  });

  it("delivers an emergency request through the real fallback after a controlled primary failure", async () => {
    expect(process.env.APP_ENVIRONMENT).toBe("staging");
    expect(process.env.BREVO_API_KEY).toBeTruthy();
    expect(process.env.LIVE_VERIFICATION_REQUESTER_EMAIL).toBeTruthy();

    const liveProvider = new BrevoContactSubmissionProvider(process.env.BREVO_API_KEY!);
    let deliveryAttempt = 0;
    const controlledProvider: ContactSubmissionProvider = {
      name: "brevo",
      async deliver(message) {
        deliveryAttempt += 1;
        if (deliveryAttempt === 1) return { ok: false, category: "unavailable" };
        return liveProvider.deliver(message);
      },
    };

    const result = await submitContactEnquiry(emergencySubmission(), controlledProvider);

    expect(result).toMatchObject({
      ok: true,
      provider: "brevo",
      usedFallback: true,
    });
    if (result.ok) {
      expect(result.reference).toMatch(/^AM-EMG-[A-Z0-9_-]{12}$/);
      expect(result.message).toContain("delivered through the fallback route");
      expect(result.message).toContain("does not mean that the incident has been accepted, assigned or seen");
      expect(result.message).toContain("08:00 to 22:00 West Africa Time");
    }
    expect(deliveryAttempt).toBe(3);
  });
});
