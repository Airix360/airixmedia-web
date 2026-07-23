import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { r3Wave2Decision, r3Wave2Review } from "./r3-wave2";

describe("R3 Wave 2 runtime evidence", () => {
  it("matches every committed runtime byte size and SHA-256", () => {
    for (const record of r3Wave2Review) {
      for (const [file, expectedBytes, expectedSha] of [[record.runtimeDay, record.dayBytes, record.runtimeDaySha], [record.runtimeNight, record.nightBytes, record.runtimeNightSha]] as const) {
        const target = path.join(process.cwd(), "public/atlas/heroes", file);
        expect(statSync(target).size).toBe(expectedBytes);
        expect(createHash("sha256").update(readFileSync(target)).digest("hex")).toBe(expectedSha);
      }
    }
  });

  it("records owner direction separately from remaining reviews", () => {
    expect(r3Wave2Review).toHaveLength(6);
    expect(r3Wave2Decision).toMatchObject({
      technicalStatus: "technically-integrated",
      ownerDecision: "owner-direction-approved",
      remainingReview: ["pending-cultural-review", "pending-rights-review", "pending-launch-review"],
    });
  });
});
