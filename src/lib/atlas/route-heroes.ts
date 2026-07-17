export type RouteHeroReviewStatus = "approved" | "pending-campus-accuracy-review" | "context-only-pending-rights-review" | "pending-independent-landmark-verification" | "pending-landmark-verification" | "pending-landmark-and-rights-review" | "owner-approved-production-qa-pending";

export type RouteHeroAsset = {
  route: "/" | "/work" | "/services" | "/publishing" | "/publishing/ojs" | "/publishing/pricing" | "/publishing/universities" | "/publishing/journal-platforms" | "/studio" | "/open-source" | "/atlas" | "/discuss" | "/contact" | "/book";
  day: string;
  night: string;
  status: RouteHeroReviewStatus;
  internalContext?: string;
  desktopPosition: string;
  mobilePosition: string;
  subject?: string;
  warning?: string;
  alt?: string;
};

export const routeHeroAssets: Record<RouteHeroAsset["route"], RouteHeroAsset> = {
  "/": { route: "/", day: "/atlas/heroes/homepage-day.webp", night: "/atlas/heroes/homepage-night.webp", status: "approved", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/work": { route: "/work", day: "/atlas/heroes/work-day.webp", night: "/atlas/heroes/work-night.webp", status: "approved", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/services": { route: "/services", day: "/atlas/heroes/services-day.webp", night: "/atlas/heroes/services-night.webp", status: "approved", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/publishing": { route: "/publishing", day: "/atlas/heroes/publishing-day.webp", night: "/atlas/heroes/publishing-night.webp", status: "approved", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/publishing/ojs": { route: "/publishing/ojs", day: "/atlas/heroes/ojs-day.webp", night: "/atlas/heroes/ojs-night.webp", status: "approved", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/publishing/pricing": { route: "/publishing/pricing", day: "/atlas/heroes/pricing-day.webp", night: "/atlas/heroes/pricing-night.webp", status: "approved", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/publishing/universities": { route: "/publishing/universities", day: "/atlas/heroes/universities-delsu-day.webp", night: "/atlas/heroes/universities-delsu-night.webp", status: "pending-campus-accuracy-review", internalContext: "DELSU — Delta State University, Abraka main campus. Artwork only; no project-scope claim.", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/publishing/journal-platforms": { route: "/publishing/journal-platforms", day: "/atlas/heroes/journal-platforms-unilag-day.webp", night: "/atlas/heroes/journal-platforms-unilag-night.webp", status: "context-only-pending-rights-review", internalContext: "UNILAG is sector and institutional context only; never a client, project, partner, endorsement or prospect.", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/studio": { route: "/studio", day: "/atlas/heroes/studio-day.webp", night: "/atlas/heroes/studio-night.webp", status: "context-only-pending-rights-review", internalContext: "Candidate artwork pending owner and rights review.", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/open-source": { route: "/open-source", day: "/atlas/heroes/open-source-day.webp", night: "/atlas/heroes/open-source-night.webp", status: "context-only-pending-rights-review", internalContext: "Candidate artwork pending owner and rights review.", desktopPosition: "50% 50%", mobilePosition: "50% bottom" },
  "/atlas": { route: "/atlas", day: "/atlas/heroes/airix-atlas-highland-systems-overlook-day.webp", night: "/atlas/heroes/airix-atlas-highland-systems-overlook-night.webp", status: "pending-independent-landmark-verification", internalContext: "Contemporary Jos highland and granite landscape. Pending independent landmark verification.", subject: "Highland city and granite landscape", warning: "Landmark accuracy is not approved.", alt: "Team reviewing plans above a highland city with granite hills", desktopPosition: "50% 50%", mobilePosition: "55% bottom" },
  "/discuss": { route: "/discuss", day: "/atlas/heroes/airix-project-discussion-granite-arrival-day.webp", night: "/atlas/heroes/airix-project-discussion-granite-arrival-night.webp", status: "pending-landmark-verification", internalContext: "Olumo Rock arrival landscape. Pending landmark verification.", subject: "Granite landmark arrival", warning: "Landmark accuracy is not approved.", alt: "Project team meeting beside a granite landmark and city road", desktopPosition: "50% 50%", mobilePosition: "59% bottom" },
  "/contact": { route: "/contact", day: "/atlas/heroes/airix-contact-transport-interchange-day.webp", night: "/atlas/heroes/airix-contact-transport-interchange-night.webp", status: "pending-landmark-and-rights-review", internalContext: "Abeokuta railway or civic-interchange context. Pending landmark and rights review.", subject: "Contemporary transport interchange", warning: "No railway endorsement or partnership is claimed.", alt: "Passengers and transport staff at a contemporary interchange", desktopPosition: "50% 50%", mobilePosition: "58% bottom" },
  "/book": { route: "/book", day: "/atlas/heroes/airix-consultation-courtyard-booking-day.webp", night: "/atlas/heroes/airix-consultation-courtyard-booking-night.webp", status: "owner-approved-production-qa-pending", internalContext: "Contemporary Nigerian consultation setting. Owner approved; normal production QA remains required.", subject: "Consultation courtyard", warning: "Not culturally approved or final-launch approved.", alt: "Clients arriving at a landscaped courtyard for a consultation", desktopPosition: "50% 50%", mobilePosition: "58% bottom" },
};

export function routeHeroFor(path: string) {
  const normalized = path === "" ? "/" : `/${path.replace(/^\//, "")}`;
  return routeHeroAssets[normalized as keyof typeof routeHeroAssets];
}
