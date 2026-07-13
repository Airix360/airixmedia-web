import type { AtlasSafeZone } from "./types";

export function sceneImageProps(decorative: boolean, alt: string) {
  return decorative
    ? { alt: "", "aria-hidden": true as const }
    : { alt, "aria-hidden": undefined };
}

export function safeZoneLabel(zone: AtlasSafeZone) {
  if (zone === "none") return "No text overlay safe zone";
  return `${zone[0].toUpperCase()}${zone.slice(1)} text safe zone`;
}

export const atlasFocusSelector = ":focus-visible" as const;
