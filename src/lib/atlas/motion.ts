import type { AtlasSceneMode } from "./types";

export const atlasMotionModes = ["layered", "static", "reduced"] as const satisfies readonly AtlasSceneMode[];

export const atlasSceneMotion = {
  monumental: {
    duration: "var(--atlas-duration-monumental)",
    easing: "var(--atlas-ease-in-out)",
  },
  route: {
    duration: "var(--atlas-duration-route)",
    easing: "var(--atlas-ease-out)",
  },
} as const;

export function motionIsEnabled(mode: AtlasSceneMode, prefersReducedMotion: boolean) {
  return mode === "layered" && !prefersReducedMotion;
}

export function atlasMotionMediaQuery() {
  return "(prefers-reduced-motion: reduce)" as const;
}
