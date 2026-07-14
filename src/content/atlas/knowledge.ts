import type { ProjectEvidence, ProjectMedia } from "@/content/atlas/landmarks";
import type { ServicePathwayContent } from "@/components/atlas/services";

export interface PublishingWorkflowStage {
  id: string;
  index: string;
  name: string;
  action: string;
  record: string;
}

export const publishingWorkflow: readonly PublishingWorkflowStage[] = [
  { id: "submission", index: "01", name: "Submission", action: "A manuscript enters the journal's configured submission process.", record: "Submission record and files" },
  { id: "assessment", index: "02", name: "Editorial assessment", action: "Editors make the journal's first workflow decision.", record: "Editorial decision and assignment" },
  { id: "review", index: "03", name: "Review", action: "The journal coordinates its configured review process.", record: "Review activity and responses" },
  { id: "revision", index: "04", name: "Revision", action: "Authors and editors exchange revised manuscript files where required.", record: "Revision history" },
  { id: "production", index: "05", name: "Production", action: "Accepted work moves through the journal's production activity.", record: "Production-ready files and metadata" },
  { id: "publication", index: "06", name: "Publication", action: "The journal assembles and publishes the article or issue.", record: "Published article or issue record" },
  { id: "discovery", index: "07", name: "Discovery and preservation", action: "Configured metadata and external services support discovery and continuity.", record: "Metadata and service deposits where agreed" },
] as const;

export const knowledgeServicePathways: readonly ServicePathwayContent[] = [
  {
    id: "ojs-implementation",
    index: "01",
    name: "OJS implementation and configuration",
    summary: "A journal platform shaped around the institution, its publications, roles, workflows, and interface.",
    covers: ["New OJS installations", "Single- and multi-journal platforms", "Journal setup", "Themes and interface customisation", "Roles, permissions, plugins, and integrations"],
    needs: ["A new journal or institutional platform", "Several journals sharing one technical foundation", "A platform configuration that reflects real publishing roles"],
    mayBuild: ["Install and configure OJS", "Set up journals, roles, permissions, and workflows", "Develop or configure themes and plugins", "Connect agreed services"],
    route: "/publishing/ojs",
    routeLabel: "OJS",
    evidenceStatus: "repository_record",
    sources: ["src/lib/pages.ts · publishing, publishing/ojs, publishing/journal-platforms", "src/lib/content.ts · Publishing Technology"],
  },
  {
    id: "migration-upgrades-recovery",
    index: "02",
    name: "Migration, upgrades, and recovery",
    summary: "Controlled change for platforms that need to move, modernise, recover, or become supportable again.",
    covers: ["Version upgrades", "Platform, database, and file migration", "Staging and validation", "Recovery and troubleshooting", "Legacy cleanup and continuity planning"],
    needs: ["An OJS version that needs a planned upgrade", "A platform moving between environments", "A failed or fragile publishing system that needs controlled recovery"],
    mayBuild: ["Inventory the current platform", "Prepare and validate a staging path", "Migrate agreed data and files", "Plan rollback, recovery, and handover"],
    route: "/publishing/ojs",
    routeLabel: "OJS",
    evidenceStatus: "repository_record",
    sources: ["src/lib/pages.ts · publishing/ojs and services/support-recovery", "src/lib/pages.ts · OJS upgrade field note"],
  },
  {
    id: "editorial-publishing-workflows",
    index: "03",
    name: "Editorial and publishing workflows",
    summary: "Configuration and technical support for the route a submission takes through a journal.",
    covers: ["Submissions and editorial stages", "Review and revision", "Production and issue publishing", "Journal and issue structure", "Author and reviewer experience", "Metadata quality"],
    needs: ["A workflow that does not match the journal's actual process", "Roles or handoffs that need clearer configuration", "Publishing teams that need documentation or training"],
    mayBuild: ["Configure agreed workflow stages and roles", "Improve submission, author, and reviewer journeys", "Support journal and issue structure", "Prepare documentation and training"],
    route: "/publishing/editorial-support",
    routeLabel: "Editorial Support",
    evidenceStatus: "repository_record",
    sources: ["src/lib/pages.ts · publishing/editorial-support", "src/lib/pricing.ts · editorial workflow configuration and training"],
  },
  {
    id: "metadata-doi-integrations",
    index: "04",
    name: "Metadata, DOI, indexing, and integrations",
    summary: "Technical preparation that helps publishing records move accurately between the journal and agreed external services.",
    covers: ["Metadata configuration", "DOI and Crossref implementation support", "Indexing preparation", "Email and external service integrations", "Payment plugins where applicable", "Archiving configuration where agreed"],
    needs: ["Metadata that needs a clearer technical structure", "A DOI or external-service workflow that needs implementation support", "Publishing systems that need email, payment, or other integrations"],
    mayBuild: ["Configure metadata fields and publishing records", "Support DOI and Crossref-related implementation", "Prepare technical indexing requirements", "Connect agreed email, payment, archiving, or external services"],
    route: "/publishing/editorial-support",
    routeLabel: "Editorial Support",
    evidenceStatus: "repository_record",
    sources: ["src/lib/pages.ts · publishing and publishing/editorial-support", "src/lib/pages.ts · publishing/plugins", "github.com/thathman/PaystackOJS"],
  },
  {
    id: "hosting-maintenance-training-support",
    index: "05",
    name: "Hosting, maintenance, training, and support",
    summary: "Ongoing technical care around the platform, its infrastructure, updates, users, and agreed operating scope.",
    covers: ["Managed hosting", "Updates and maintenance", "Backups and monitoring", "User training and documentation", "Issue resolution", "Platform improvement and continuity"],
    needs: ["A platform without clear technical ownership", "Recurring updates, backups, or support needs", "A publishing team preparing to operate a changed platform"],
    mayBuild: ["Host and maintain an agreed OJS environment", "Configure backups and monitoring", "Provide scoped user training and support", "Plan ongoing platform improvement"],
    route: "/publishing/hosting-support",
    routeLabel: "Hosting and Support",
    evidenceStatus: "repository_record",
    sources: ["src/lib/pages.ts · publishing/hosting-support", "src/lib/content.ts · Publishing Technology and Managed Infrastructure"],
  },
  {
    id: "open-source-publishing",
    index: "06",
    name: "Open-source publishing work",
    summary: "Public tools that address specific OJS publishing and payment problems, with their evidence and limits kept visible.",
    covers: ["Public OJS plugins", "Repository documentation", "Versioned releases", "Installation and compatibility notes", "Maintenance boundaries"],
    needs: ["A publishing problem already addressed by a public tool", "A team that needs inspectable implementation evidence", "A clear boundary between open-source code and managed service"],
    mayBuild: ["Maintain public publishing tools", "Document installation and supported environments", "Scope separate installation, customisation, or managed support where agreed"],
    route: "/open-source",
    routeLabel: "Open Source",
    evidenceStatus: "repository_record",
    sources: ["github.com/thathman/PaystackOJS", "src/lib/pages.ts · publishing/plugins"],
  },
] as const;

export const publishingSystem = [
  { name: "People and roles", role: "Authors, reviewers, editors, managers, and readers work through configured permissions and responsibilities." },
  { name: "Manuscripts and files", role: "Submissions, revisions, review material, and production files move through the agreed workflow." },
  { name: "Editorial workflow", role: "The platform records configured stages, assignments, decisions, and handoffs." },
  { name: "Journal and issue record", role: "Articles, issues, sections, and publication state form the journal's visible scholarly record." },
  { name: "Metadata and DOI", role: "Structured publication metadata and DOI-related implementation connect records to agreed services." },
  { name: "External services", role: "Email, payments where applicable, indexing preparation, archiving, and other integrations connect at defined points." },
  { name: "Hosting and continuity", role: "Infrastructure, updates, backups, monitoring, support, and improvement sustain the agreed platform scope." },
] as const;

export const knowledgeEvidenceMedia: readonly ProjectMedia[] = [
  {
    id: "ku-home",
    src: "/images/atlas/evidence/w2/ku-journals-home-2026-07-14.png",
    alt: "KU Journals public homepage showing its editorial opening and Kampala University identity.",
    caption: "Current public publishing interface retained as source-captured evidence; it does not establish unrecorded outcomes or editorial responsibility.",
    type: "Public interface capture",
    capturedAt: "2026-07-14",
  },
  {
    id: "ku-credit",
    src: "/images/atlas/evidence/w2/ku-journals-footer-credit-2026-07-14.png",
    alt: "KU Journals footer with the visible credit Designed, Developed and Maintained by Airix Media.",
    caption: "Public responsibility credit captured from the live footer. The original brief and measurable outcomes remain unverified.",
    type: "Responsibility credit capture",
    capturedAt: "2026-07-14",
  },
] as const;

export const knowledgeContinuity = {
  need: ["Journal platforms require named technical ownership beyond initial setup or change."],
  responsibility: ["Airix may scope hosting, updates, backups, monitoring, maintenance, training, support, recovery, and platform improvement around an agreed publishing environment."],
  exclusions: ["No response time, uptime, package price, indexing acceptance, DOI ownership, provider membership, editorial outcome, or support guarantee is promised by this review slice."],
} as const;

export const knowledgeContinuityEvidence: readonly ProjectEvidence[] = [
  { label: "Hosting, updates, backups, monitoring, maintenance, training, and support are recorded publishing capabilities.", type: "Service scope", status: "repository_record", source: "src/lib/pages.ts · publishing and publishing/hosting-support" },
  { label: "The KU Journals public footer credits Airix Media with design, development, and maintenance.", type: "Responsibility record", status: "source_capture", source: "Live footer capture · 2026-07-14", href: "https://kujournals.ac.ug" },
  { label: "Exact service levels, support commitments, package terms, and platform-specific responsibilities require an agreed proposal or contract.", type: "Commercial terms", status: "placeholder", source: "src/lib/pages.ts · publishing/hosting-support and docs/CONTENT_GAPS.md" },
] as const;

export const paystackOjsProject = {
  name: "OJS Paystack Payment Gateway",
  repository: "https://github.com/thathman/PaystackOJS",
  purpose: "A public OJS payment gateway plugin using Paystack-hosted checkout with server-side verification before fulfilment.",
  status: "Public repository · active · latest GitHub release v1.1.1.0",
  evidence: ["Repository is public and not archived", "GPL-3.0 licence recorded by GitHub", "README documents OJS 3.5.0+ and PHP 8.1+ requirements", "GitHub releases list v1.1.1.0 as the latest release"],
  limitations: ["No adoption or institutional-user count is claimed", "Paystack account eligibility governs available currencies", "README header still displays version 1.1.0 while GitHub's latest release is v1.1.1.0", "Installation, customisation, managed updates, and support are separate scopes"],
  problem: "Connect OJS payment workflows to Paystack without placing card data on the journal server.",
} as const;
