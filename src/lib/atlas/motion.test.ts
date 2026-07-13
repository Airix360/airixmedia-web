import { describe, expect, it } from "vitest";
import { atlasMotionMediaQuery, motionIsEnabled } from "./motion";

describe("Atlas motion policy", () => {
  it("only enables depth motion in layered mode without a reduced-motion preference", () => {
    expect(motionIsEnabled("layered", false)).toBe(true);
    expect(motionIsEnabled("layered", true)).toBe(false);
    expect(motionIsEnabled("static", false)).toBe(false);
    expect(motionIsEnabled("reduced", false)).toBe(false);
  });

  it("uses the platform reduced-motion media query", () => {
    expect(atlasMotionMediaQuery()).toBe("(prefers-reduced-motion: reduce)");
  });
});
