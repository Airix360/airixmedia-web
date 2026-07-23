export type W9Status = "pending-owner-review" | "pending-cultural-review" | "technical-defect" | "ready-for-owner-review";

export type W9Artwork = {
  id: string;
  key: string;
  state: "Lagos" | "Oyo" | "Rivers" | "Edo" | "Kaduna" | "Plateau" | "Ogun";
  family: string;
  routes: string[];
  desktop: string;
  mobile: string;
  tablet: string;
  thumbnail: string;
  status: W9Status;
  ownerStatus: W9Status;
  culturalStatus: W9Status;
  anchors: { geographic: string; infrastructure: string; activity: string; material: string };
  defects: string;
  sourceMaster: string;
  sourceDimensions: string;
  sizes: { desktop: number; mobile: number; compactMobile: number; tablet: number; thumbnail: number };
  focal: { desktop: string; mobile: string };
  safe: { desktop: "left" | "right"; mobile: "top" };
};

const publicAsset = (
  input: Omit<W9Artwork, "desktop" | "mobile" | "tablet" | "thumbnail" | "status" | "ownerStatus" | "culturalStatus"> & { base: string; file: string },
): W9Artwork => ({
  ...input,
  desktop: `${input.base}/${input.file}_desktop_1440x811_v01.webp`,
  mobile: `${input.base}/${input.file}_mobile_960x1200_v01.webp`,
  tablet: `${input.base}/${input.file}_tablet_1024x768_v01.webp`,
  thumbnail: `${input.base}/${input.file}_thumbnail_480x270_v01.webp`,
  status: "ready-for-owner-review",
  ownerStatus: "pending-owner-review",
  culturalStatus: "pending-cultural-review",
});

const shared = {
  defects: "No blocking defect observed at audit scale. Hands, faces, papers, tools, rails and transport geometry require closer owner review.",
  focal: { desktop: "68% 54%", mobile: "50% 66%" },
} as const;

export const w9Artwork: W9Artwork[] = [
  publicAsset({ id: "ILL-0120", key: "lagos-arrival", state: "Lagos", family: "Arrival", routes: ["/", "/work", "/services", "/services/digital-experiences", "/services/business-systems"], base: "/images/atlas/public/lagos/arrival", file: "ILL-0120_lagos-arrival", sourceMaster: "-airix-atlas@16fcb3a/w8-source/lagos/arrival/*-source-*.png", sourceDimensions: "desktop and mobile source masters", sizes: { desktop: 181386, mobile: 149614, compactMobile: 59364, tablet: 120038, thumbnail: 22024 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Lagoon-edge metropolitan movement", infrastructure: "Road, bridge and service routes", activity: "Arrival and connected system movement", material: "Concrete, water, road paint and dense planting" } }),
  publicAsset({ id: "ILL-0100", key: "oyo-publishing", state: "Oyo", family: "Publishing", routes: ["/publishing", "/publishing/universities", "/publishing/editorial-support", "/work/ku-journals"], base: "/images/atlas/public/oyo/publishing", file: "ILL-0100_oyo-publishing", sourceMaster: "-airix-atlas@16fcb3a/w8-source/oyo/publishing/*-source-*.png", sourceDimensions: "desktop and mobile source masters", sizes: { desktop: 193670, mobile: 242794, compactMobile: 91972, tablet: 119598, thumbnail: 23852 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Oyo courtyard and shaded compound", infrastructure: "Editorial rooms around a shared court", activity: "Submission, review and production handoffs", material: "Earth, timber, paper and shaded masonry" } }),
  publicAsset({ id: "ILL-0101", key: "oyo-workflow", state: "Oyo", family: "OJS workflow", routes: ["/publishing/ojs", "/publishing/journal-platforms"], base: "/images/atlas/public/oyo/ojs-workflow", file: "ILL-0101_oyo-ojs-workflow", sourceMaster: "-airix-atlas@16fcb3a/w8-source/oyo/ojs-workflow/*-source-*.png", sourceDimensions: "desktop and mobile source masters", sizes: { desktop: 245122, mobile: 210816, compactMobile: 85096, tablet: 150474, thumbnail: 29652 }, safe: { desktop: "right", mobile: "top" }, ...shared, anchors: { geographic: "Oyo courtyard sequence", infrastructure: "Connected editorial stations", activity: "Manuscript movement through workflow", material: "Paper, timber, earth and masonry" } }),
  publicAsset({ id: "ILL-0102", key: "oyo-migration", state: "Oyo", family: "Migration", routes: ["/publishing/pricing"], base: "/images/atlas/public/oyo/migration", file: "ILL-0102_oyo-migration", sourceMaster: "-airix-atlas@16fcb3a/w8-source/oyo/migration/*-source-*.png", sourceDimensions: "desktop and mobile source masters", sizes: { desktop: 225786, mobile: 237788, compactMobile: 93516, tablet: 143204, thumbnail: 24248 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Oyo knowledge compound", infrastructure: "Staged transfer route", activity: "Inventory, migration and validation", material: "Archive boxes, paper, timber and earth" } }),
  publicAsset({ id: "ILL-0103", key: "oyo-open-source", state: "Oyo", family: "Open source", routes: ["/publishing/plugins"], base: "/images/atlas/public/oyo/open-source", file: "ILL-0103_oyo-open-source", sourceMaster: "-airix-atlas@16fcb3a/w8-source/oyo/open-source/*-source-*.png", sourceDimensions: "desktop and mobile source masters", sizes: { desktop: 250410, mobile: 198774, compactMobile: 74538, tablet: 154530, thumbnail: 31400 }, safe: { desktop: "right", mobile: "top" }, ...shared, anchors: { geographic: "Oyo workshop courtyard", infrastructure: "Open workbench and testing route", activity: "Plugin assembly, testing and documentation", material: "Timber, paper, earth and metal tools" } }),
  publicAsset({ id: "ILL-0110", key: "rivers-infrastructure", state: "Rivers", family: "Infrastructure", routes: ["/services/managed-infrastructure", "/status", "/security"], base: "/images/atlas/public/rivers/infrastructure", file: "ILL-0110_rivers-infrastructure", sourceMaster: "-airix-atlas@16fcb3a/w8-source/rivers/infrastructure/*-source-*.png", sourceDimensions: "desktop and mobile source masters", sizes: { desktop: 178552, mobile: 171548, compactMobile: 67884, tablet: 116646, thumbnail: 21680 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Delta waterways and wetland edge", infrastructure: "Marine service routes and operating plant", activity: "Monitoring and infrastructure maintenance", material: "Water, steel, concrete and mangrove planting" } }),
  publicAsset({ id: "ILL-0111", key: "rivers-support", state: "Rivers", family: "Support", routes: ["/services/support-recovery", "/publishing/hosting-support", "/support", "/knowledge-base", "/service-levels"], base: "/images/atlas/public/rivers/support", file: "ILL-0111_rivers-support", sourceMaster: "-airix-atlas@16fcb3a/w8-source/rivers/support/*-source-*.png", sourceDimensions: "desktop and mobile source masters", sizes: { desktop: 224302, mobile: 255602, compactMobile: 99272, tablet: 138558, thumbnail: 27294 }, safe: { desktop: "right", mobile: "top" }, ...shared, anchors: { geographic: "Delta waterfront service district", infrastructure: "Boat, dock and maintenance links", activity: "Inspection, repair and handover", material: "Water, timber, steel and concrete" } }),
  publicAsset({ id: "ILL-0112", key: "rivers-emergency", state: "Rivers", family: "Emergency", routes: ["/support/emergency"], base: "/images/atlas/public/rivers/emergency", file: "ILL-0112_rivers-emergency", sourceMaster: "-airix-atlas@16fcb3a/w8-source/rivers/emergency/*-source-*.png", sourceDimensions: "desktop and mobile source masters", sizes: { desktop: 197504, mobile: 114916, compactMobile: 43802, tablet: 114114, thumbnail: 24092 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Rivers night waterfront", infrastructure: "Recovery route and service access", activity: "Triage, evidence protection and repair", material: "Dark water, work lights, steel and concrete" } }),
  publicAsset({ id: "ILL-0051", key: "edo-studio", state: "Edo", family: "Studio", routes: ["/studio"], base: "/images/atlas/states/edo/studio/web", file: "ILL-0051_edo-studio", sourceMaster: "public/images/atlas/states/edo/studio/source/*-source-*.png", sourceDimensions: "1672×941 desktop; 864×1821 mobile", sizes: { desktop: 205806, mobile: 126428, compactMobile: 57500, tablet: 164746, thumbnail: 23156 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Benin City radial urban morphology", infrastructure: "Covered workshop wings and spoke routes", activity: "Reviewing drawings, prototypes and material samples", material: "Red earth, masonry, timber and planting" } }),
  publicAsset({ id: "ILL-0060", key: "kaduna-labs", state: "Kaduna", family: "Labs", routes: ["/open-source", "/open-source/*"], base: "/images/atlas/states/kaduna/labs/web", file: "ILL-0060_kaduna-labs", sourceMaster: "public/images/atlas/states/kaduna/labs/source/*-source-*.png", sourceDimensions: "1672×941 desktop; 1003×1568 mobile", sizes: { desktop: 190926, mobile: 165142, compactMobile: 69816, tablet: 125536, thumbnail: 24014 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Kaduna-like planned northern grid", infrastructure: "Rail, workshop bays and testing route", activity: "Assembly, testing and documentation", material: "Laterite, steel, masonry and dry-season planting" } }),
  publicAsset({ id: "ILL-0090", key: "plateau-observatory", state: "Plateau", family: "Observatory", routes: ["/atlas"], base: "/images/atlas/states/plateau/observatory/web", file: "ILL-0090_plateau-observatory", sourceMaster: "public/images/atlas/states/plateau/observatory/source/*-source-*.png", sourceDimensions: "1672×941 desktop; 1003×1568 mobile", sizes: { desktop: 227452, mobile: 197124, compactMobile: 73346, tablet: 109744, thumbnail: 24732 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Jos Plateau rock and elevated horizon", infrastructure: "Terraced observation routes", activity: "Mapping systems and evidence", material: "Granite, earth, timber and highland planting" } }),
  publicAsset({ id: "ILL-0091", key: "plateau-insights", state: "Plateau", family: "Insights", routes: ["/insights"], base: "/images/atlas/states/plateau/insights/web", file: "ILL-0091_plateau-insights", sourceMaster: "public/images/atlas/states/plateau/insights/source/*-source-*.png", sourceDimensions: "1672×941 desktop; 1003×1568 mobile", sizes: { desktop: 175296, mobile: 135080, compactMobile: 48500, tablet: 86876, thumbnail: 20670 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Plateau terraces and rock forms", infrastructure: "Field-note paths and observation table", activity: "Interpreting operational evidence", material: "Granite, paper, timber and grass" } }),
  publicAsset({ id: "ILL-0092", key: "plateau-resources", state: "Plateau", family: "Resources", routes: ["/resources"], base: "/images/atlas/states/plateau/resources/web", file: "ILL-0092_plateau-resources", sourceMaster: "public/images/atlas/states/plateau/resources/source/*-source-*.png", sourceDimensions: "1672×941 desktop; 1003×1568 mobile", sizes: { desktop: 218288, mobile: 186482, compactMobile: 66572, tablet: 107634, thumbnail: 27304 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Plateau highland storehouse", infrastructure: "Terraced resource route", activity: "Preparing, checking and issuing tools", material: "Granite, timber, paper and grass" } }),
  publicAsset({ id: "ILL-0083", key: "ogun-gateway", state: "Ogun", family: "Gateway", routes: ["/discuss"], base: "/images/atlas/states/ogun/gateway/web", file: "ILL-0083_ogun-gateway", sourceMaster: "public/images/atlas/states/ogun/gateway/source/*-source-*.png", sourceDimensions: "1672×941 desktop; 1003×1568 mobile", sizes: { desktop: 222388, mobile: 112676, compactMobile: 42102, tablet: 150956, thumbnail: 21198 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Abeokuta-like layered granite horizon", infrastructure: "Rail, road and pedestrian handoff", activity: "Comparing routes and handing in briefs", material: "Granite, timber, concrete and rail steel" } }),
  publicAsset({ id: "ILL-0084", key: "ogun-contact", state: "Ogun", family: "Contact", routes: ["/contact"], base: "/images/atlas/states/ogun/contact/web", file: "ILL-0084_ogun-contact", sourceMaster: "public/images/atlas/states/ogun/contact/source/*-source-*.png", sourceDimensions: "1672×941 desktop; 1003×1568 mobile", sizes: { desktop: 183942, mobile: 134124, compactMobile: 55344, tablet: 131140, thumbnail: 17652 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Ogun granite approach", infrastructure: "Message handoff pavilion", activity: "Preparing and routing enquiries", material: "Granite, timber, concrete and steel" } }),
  publicAsset({ id: "ILL-0085", key: "ogun-booking", state: "Ogun", family: "Booking", routes: ["/book"], base: "/images/atlas/states/ogun/booking/web", file: "ILL-0085_ogun-booking", sourceMaster: "public/images/atlas/states/ogun/booking/source/*-source-*.png", sourceDimensions: "1672×941 desktop; 1003×1568 mobile", sizes: { desktop: 213658, mobile: 135448, compactMobile: 52400, tablet: 152038, thumbnail: 20588 }, safe: { desktop: "left", mobile: "top" }, ...shared, anchors: { geographic: "Ogun granite gateway terrain", infrastructure: "Meeting threshold and approach routes", activity: "Preparing context before conversation", material: "Granite, timber, concrete and planting" } }),
];

export const w9PageFamilies = [
  ["Arrival", "/", "Lagos", "Public homepage and broad proposition"],
  ["Landmarks", "/work", "Lagos", "Evidence-led project presentation"],
  ["Services", "/services", "Lagos / Rivers", "Build, Run and Rescue service routes"],
  ["Publishing", "/publishing", "Oyo", "OJS, pricing, plugins and institutional publishing"],
  ["Continuity", "/support", "Rivers", "Support, recovery, security and service boundaries"],
  ["Studio", "/studio", "Edo", "Brand-level company positioning"],
  ["Labs", "/open-source", "Kaduna", "Verified public repositories"],
  ["Observatory", "/atlas", "Plateau", "Atlas, insights and resources"],
  ["Gateway", "/discuss", "Ogun", "Local-only enquiry and booking journeys"],
  ["Legal", "/legal", "Shared", "Draft legal structure; launch blocker"],
] as const;

export const w9LaunchChecks = [
  ["Artwork approval", "Not met", "All 16 active families still need owner, cultural and rights approval."],
  ["Legal approval", "Not met", "Entity, jurisdiction, controller, retention and service terms remain unverified."],
  ["Production integrations", "Not met", "CRM, calendar, analytics, consent, status and uploads remain deliberately unavailable."],
  ["Localization", "Not met", "French and Portuguese critical journeys are incomplete and noindexed."],
  ["Technical baseline", "In review", "Local checks and multi-viewport evidence must pass on the final W9 commit."],
] as const;
