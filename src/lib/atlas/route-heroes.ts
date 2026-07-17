export type RouteHeroReviewStatus = "approved" | "pending-campus-accuracy-review" | "context-only-pending-rights-review";

export type RouteHeroAsset = {
  route: "/" | "/work" | "/services" | "/publishing" | "/publishing/ojs" | "/publishing/pricing" | "/publishing/universities" | "/publishing/journal-platforms" | "/studio" | "/open-source";
  day: string;
  night: string;
  status: RouteHeroReviewStatus;
  internalContext?: string;
  mobilePosition: string;
};

export const routeHeroAssets: Record<RouteHeroAsset["route"], RouteHeroAsset> = {
  "/": { route: "/", day: "/atlas/heroes/homepage-day.webp", night: "/atlas/heroes/homepage-night.webp", status: "approved", mobilePosition: "50% bottom" },
  "/work": { route: "/work", day: "/atlas/heroes/work-day.webp", night: "/atlas/heroes/work-night.webp", status: "approved", mobilePosition: "50% bottom" },
  "/services": { route: "/services", day: "/atlas/heroes/services-day.webp", night: "/atlas/heroes/services-night.webp", status: "approved", mobilePosition: "50% bottom" },
  "/publishing": { route: "/publishing", day: "/atlas/heroes/publishing-day.webp", night: "/atlas/heroes/publishing-night.webp", status: "approved", mobilePosition: "50% bottom" },
  "/publishing/ojs": { route: "/publishing/ojs", day: "/atlas/heroes/ojs-day.webp", night: "/atlas/heroes/ojs-night.webp", status: "approved", mobilePosition: "50% bottom" },
  "/publishing/pricing": { route: "/publishing/pricing", day: "/atlas/heroes/pricing-day.webp", night: "/atlas/heroes/pricing-night.webp", status: "approved", mobilePosition: "50% bottom" },
  "/publishing/universities": { route: "/publishing/universities", day: "/atlas/heroes/universities-delsu-day.webp", night: "/atlas/heroes/universities-delsu-night.webp", status: "pending-campus-accuracy-review", internalContext: "DELSU — Delta State University, Abraka main campus. Artwork only; no project-scope claim.", mobilePosition: "50% bottom" },
  "/publishing/journal-platforms": { route: "/publishing/journal-platforms", day: "/atlas/heroes/journal-platforms-unilag-day.webp", night: "/atlas/heroes/journal-platforms-unilag-night.webp", status: "context-only-pending-rights-review", internalContext: "UNILAG is sector and institutional context only; never a client, project, partner, endorsement or prospect.", mobilePosition: "50% bottom" },
  "/studio": { route: "/studio", day: "/atlas/heroes/studio-day.webp", night: "/atlas/heroes/studio-night.webp", status: "context-only-pending-rights-review", internalContext: "Candidate artwork pending owner and rights review.", mobilePosition: "50% bottom" },
  "/open-source": { route: "/open-source", day: "/atlas/heroes/open-source-day.webp", night: "/atlas/heroes/open-source-night.webp", status: "context-only-pending-rights-review", internalContext: "Candidate artwork pending owner and rights review.", mobilePosition: "50% bottom" },
};

export function routeHeroFor(path: string) {
  const normalized = path === "" ? "/" : `/${path.replace(/^\//, "")}`;
  return routeHeroAssets[normalized as keyof typeof routeHeroAssets];
}
