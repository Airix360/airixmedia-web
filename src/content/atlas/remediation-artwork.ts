export type RemediationHero = {
  route: string;
  heroId: string;
  subject: string;
  light: string;
  dark: string;
  desktopFocal: string;
  tabletFocal: string;
  mobileFocal: string;
  compactMobileFocal: string;
  status: "existing-candidate" | "generated-r1" | "owner-review";
};

/** Governance inventory. Geographic assignments remain private; public rendering uses direct service language. */
export const remediationArtwork: RemediationHero[] = [
  { route: "/", heroId: "hero-arrival-third-mainland", subject: "Third Mainland Bridge, lagoon, ferries and ordinary movement", light: "/images/atlas/public/lagos/arrival/ILL-0120_lagos-arrival_desktop_1440x811_v01.webp", dark: "/images/atlas/public/lagos/arrival/ILL-0120_lagos-arrival_desktop_1440x811_v01.webp", desktopFocal: "center", tabletFocal: "center", mobileFocal: "bottom center", compactMobileFocal: "bottom center", status: "existing-candidate" },
  { route: "/trust", heroId: "hero-trust-courtyard", subject: "Maintained civic courtyard and stewardship tree", light: "/images/atlas/graphics/trust-tree/trust-tree-day.webp", dark: "/images/atlas/graphics/trust-tree/trust-tree-night.webp", desktopFocal: "center", tabletFocal: "center", mobileFocal: "bottom center", compactMobileFocal: "bottom center", status: "generated-r1" }
];
