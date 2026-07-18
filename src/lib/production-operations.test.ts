import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { safePublicFallbackUrl } from "./contact-submission";

const root = process.cwd();
const config = fs.readFileSync(path.join(root, "config/airixmedia-production.env.example"), "utf8");
const decisions = fs.readFileSync(path.join(root, "docs/atlas-r3-production-operations-decisions.md"), "utf8");

describe("approved production operations decisions", () => {
  it("records exact role routing without a real secret", () => {
    expect(config).toContain("CONTACT_GENERAL_RECIPIENTS=hello@airixmedia.com");
    expect(config).toContain("CONTACT_PROJECT_RECIPIENTS=hello@airixmedia.com");
    expect(config).toContain("CONTACT_BOOKING_RECIPIENTS=hello@airixmedia.com");
    expect(config).toContain("CONTACT_PUBLISHING_RECIPIENTS=publishing@airixmedia.com");
    expect(config).toContain("CONTACT_SUPPORT_RECIPIENTS=support@airixmedia.com");
    expect(config).toContain("EMERGENCY_RECIPIENTS=emergency@airixmedia.com");
    expect(config).toContain("EMERGENCY_FALLBACK_RECIPIENTS=operations@airixmedia.com");
    expect(config).toContain("BREVO_API_KEY=<supplied-securely-outside-git>");
    expect(config).not.toMatch(/xkeysib-/i);
  });

  it("records truthful hours, topology and attachment boundaries", () => {
    expect(decisions).toContain("08:00–22:00 West Africa Time");
    expect(decisions).toContain("outside-hours handling is best effort");
    expect(decisions).toContain("not 24/7 coverage");
    expect(decisions).not.toMatch(/(?:provides|offers|guarantees) 24\/7/i);
    expect(decisions).toContain("one persistent Node.js application process/container");
    expect(decisions).toContain("second instance is prohibited");
    expect(decisions).toContain("CONTACT_ATTACHMENT_PROVIDER=disabled");
  });

  it("allows the approved public mailto fallback and rejects active schemes", () => {
    const fallback = config.match(/^EMERGENCY_PUBLIC_FALLBACK_URL=(.+)$/m)?.[1];
    expect(safePublicFallbackUrl(fallback)).toBe(fallback);
    expect(safePublicFallbackUrl("javascript:alert(1)")).toBeUndefined();
  });
});
