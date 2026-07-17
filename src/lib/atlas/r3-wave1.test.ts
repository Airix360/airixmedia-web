import { describe, expect, it } from "vitest";
import { r3Wave1Review, r3Wave1SharedDecisions } from "./r3-wave1";

describe("R3 Wave 1 owner decisions", () => {
  it("keeps owner approval separate from specialist verification", () => {
    const records = Object.fromEntries(r3Wave1Review.map((record) => [record.route, record]));

    expect(records["/atlas"]).toMatchObject({
      ownerDecision: "owner-direction-approved",
      remainingVerification: ["pending-independent-landmark-verification"],
    });
    expect(records["/discuss"]).toMatchObject({
      ownerDecision: "owner-direction-approved",
      remainingVerification: ["pending-landmark-verification", "pending-cultural-review"],
    });
    expect(records["/contact"]).toMatchObject({
      ownerDecision: "owner-direction-approved",
      remainingVerification: ["pending-landmark-verification", "pending-rights-review"],
    });
    expect(records["/book"]).toMatchObject({
      ownerDecision: "owner-approved",
      remainingVerification: ["production-qa-required"],
    });
  });

  it("records the approved adaptive presentation decisions", () => {
    expect(r3Wave1SharedDecisions).toContain("Light/Dark adaptive image switching approved");
    expect(r3Wave1SharedDecisions).toContain("Redesigned theme switch approved");
    expect(r3Wave1SharedDecisions).toContain("390×844 and 360×800 crops approved");
    expect(r3Wave1SharedDecisions).toContain("Single active hero request approved");
  });
});
