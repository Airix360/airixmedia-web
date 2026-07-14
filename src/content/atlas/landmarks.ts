import type { AtlasDistrictId, AtlasPath } from "@/lib/atlas/types";

export type ProofStatus = "verified" | "source_capture" | "placeholder";

export interface ProjectMedia {
  id: string;
  src: AtlasPath;
  alt: string;
  caption: string;
  type: "Public interface capture" | "Responsibility credit capture";
  capturedAt: string;
}

export interface ProjectEvidence {
  label: string;
  type: "Repository record" | "Infrastructure audit" | "Live URL" | "Public interface" | "Responsibility record" | "Outcome record";
  status: ProofStatus;
  source: string;
  href?: string;
}

export interface LandmarkProject {
  id: "technology" | "publishing";
  name: string;
  relationship: string;
  district: AtlasDistrictId;
  proofStatus: ProofStatus;
  need: readonly string[];
  responsibility: readonly string[];
  exclusions: readonly string[];
  media: readonly ProjectMedia[];
  evidence: readonly ProjectEvidence[];
}

export const technologyLandmark: LandmarkProject = {
  id: "technology",
  name: "Airix Food",
  relationship: "Airix 360 sister venture · structural proof example",
  district: "commerce",
  proofStatus: "placeholder",
  need: ["The repository identifies Airix Food as a case-study candidate, but its project need has not been verified."],
  responsibility: ["No approved responsibility statement is available in the repository."],
  exclusions: ["No current interface capture, delivery record, outcome, date, or approved venture narrative is presented as proof."],
  media: [],
  evidence: [
    { label: "Airix Food is recorded as an Airix 360 sister venture and case-study candidate.", type: "Repository record", status: "source_capture", source: "src/lib/pages.ts and docs/CASE_STUDY_CANDIDATES.md" },
    { label: "The airixfood.com zone existed at audit time; this is not an uptime or project-delivery claim.", type: "Infrastructure audit", status: "source_capture", source: "docs/CLOUDFLARE_AUDIT.md" },
    { label: "Approved, authentic project screenshots are required.", type: "Public interface", status: "placeholder", source: "Missing" },
    { label: "Owner-approved scope and responsibility record is required.", type: "Responsibility record", status: "placeholder", source: "Missing" },
    { label: "Verified outcomes are required before publication.", type: "Outcome record", status: "placeholder", source: "Missing" },
  ],
};

export const publishingLandmark: LandmarkProject = {
  id: "publishing",
  name: "KU Journals",
  relationship: "Kampala University publishing · evidence review",
  district: "knowledge",
  proofStatus: "source_capture",
  need: ["The institution's original project need and constraints are not verified in the repository."],
  responsibility: ["The current public footer explicitly credits Airix Media with design, development, and maintenance."],
  exclusions: ["Editorial claims, journal content, institutional metrics, policies, and publishing decisions are not attributed to Airix by this proof record."],
  media: [
    {
      id: "ku-home",
      src: "/images/atlas/evidence/w2/ku-journals-home-2026-07-14.png",
      alt: "KU Journals public homepage showing its green editorial opening and Kampala University identity.",
      caption: "Current public homepage captured from the repository-documented domain for internal evidence review.",
      type: "Public interface capture",
      capturedAt: "2026-07-14",
    },
    {
      id: "ku-credit",
      src: "/images/atlas/evidence/w2/ku-journals-footer-credit-2026-07-14.png",
      alt: "KU Journals footer with journal links and the visible credit Designed, Developed and Maintained by Airix Media.",
      caption: "Public footer capture containing the visible Airix Media responsibility credit.",
      type: "Responsibility credit capture",
      capturedAt: "2026-07-14",
    },
  ],
  evidence: [
    { label: "kujournals.ac.ug existed as an active zone at audit time.", type: "Infrastructure audit", status: "verified", source: "docs/CLOUDFLARE_AUDIT.md" },
    { label: "Current public KU Journals interface.", type: "Live URL", status: "verified", source: "kujournals.ac.ug", href: "https://kujournals.ac.ug" },
    { label: "Public footer credits Airix Media with design, development, and maintenance.", type: "Responsibility record", status: "source_capture", source: "Live footer capture · 2026-07-14", href: "https://kujournals.ac.ug" },
    { label: "The existing repository narrative remains owner-review content and is not repeated as fact here.", type: "Repository record", status: "placeholder", source: "src/lib/content.ts · inferred_needs_review" },
    { label: "No measurable outcome is published.", type: "Outcome record", status: "placeholder", source: "Missing" },
  ],
};
