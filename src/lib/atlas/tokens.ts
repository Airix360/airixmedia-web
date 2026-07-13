import type { AtlasDistrictId } from "./types";

export const atlasColours = {
  paperCream: "#F2E7CF",
  signalOrange: "#F26A2E",
  transitYellow: "#F4C430",
  terracotta: "#B84F35",
  deepUmber: "#3B241C",
  charcoalInk: "#1E1B18",
  lagoonBlue: "#5E8C91",
  foliageGreen: "#65724B",
} as const;

export const atlasTypography = {
  display: "var(--atlas-font-display)",
  structural: "var(--atlas-font-structural)",
  editorial: "var(--atlas-font-editorial)",
  body: "var(--atlas-font-body)",
  wayfinding: "var(--atlas-font-wayfinding)",
} as const;

export const atlasSpacing = {
  "3xs": "var(--atlas-space-3xs)",
  "2xs": "var(--atlas-space-2xs)",
  xs: "var(--atlas-space-xs)",
  sm: "var(--atlas-space-sm)",
  md: "var(--atlas-space-md)",
  lg: "var(--atlas-space-lg)",
  xl: "var(--atlas-space-xl)",
  "2xl": "var(--atlas-space-2xl)",
  "3xl": "var(--atlas-space-3xl)",
  "4xl": "var(--atlas-space-4xl)",
} as const;

export const atlasMotion = {
  durations: {
    instant: "var(--atlas-duration-instant)",
    fast: "var(--atlas-duration-fast)",
    route: "var(--atlas-duration-route)",
    scene: "var(--atlas-duration-scene)",
    monumental: "var(--atlas-duration-monumental)",
  },
  easing: {
    out: "var(--atlas-ease-out)",
    inOut: "var(--atlas-ease-in-out)",
    linear: "var(--atlas-ease-linear)",
  },
} as const;

export const atlasDistrictAccents: Record<AtlasDistrictId, string> = {
  arrival: "var(--atlas-district-arrival)",
  landmarks: "var(--atlas-district-landmarks)",
  commerce: "var(--atlas-district-commerce)",
  knowledge: "var(--atlas-district-knowledge)",
  infrastructure: "var(--atlas-district-infrastructure)",
  studio: "var(--atlas-district-studio)",
  labs: "var(--atlas-district-labs)",
  observatory: "var(--atlas-district-observatory)",
  gateway: "var(--atlas-district-gateway)",
};

export const atlasContentWidths = {
  reading: "var(--atlas-content-reading)",
  copy: "var(--atlas-content-copy)",
  scene: "var(--atlas-content-scene)",
  wide: "var(--atlas-content-wide)",
} as const;

export type AtlasColourToken = keyof typeof atlasColours;
export type AtlasSpacingToken = keyof typeof atlasSpacing;
