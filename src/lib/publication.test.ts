import { describe, expect, it } from "vitest";
import { canPublish, filterPublishable } from "./publication";

describe("publication states", () => {
  it("publishes only verified and owner-confirmed material in production", () => {
    expect(canPublish("verified", true)).toBe(true);
    expect(canPublish("owner_confirmed", true)).toBe(true);
    expect(canPublish("inferred_needs_review", true)).toBe(false);
    expect(canPublish("placeholder", true)).toBe(false);
    expect(canPublish("do_not_publish", true)).toBe(false);
  });
  it("keeps review content visible outside production but never exposes do-not-publish", () => {
    const items = [{ evidence: "verified" as const }, { evidence: "inferred_needs_review" as const }, { evidence: "do_not_publish" as const }];
    expect(filterPublishable(items, false)).toHaveLength(2);
  });
});
