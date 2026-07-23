import type { RouteHeroAsset } from "@/lib/atlas/route-heroes";

export type PublicSection = {
  id?: string;
  eyebrow?: string;
  title: string;
  body: string;
  items?: string[];
  details?: Array<{ label: string; body: string }>;
  visualRoute?: RouteHeroAsset["route"];
  action?: { label: string; href: string };
};

export type PublicPage = {
  path: "work" | "services" | "publishing" | "studio" | "open-source" | "contact" | "support" | "support/emergency";
  eyebrow: string;
  title: string;
  summary: string;
  sections: PublicSection[];
  action?: { label: string; href: string };
};

const projectLink = (service?: string, source?: string) => {
  const params = new URLSearchParams({ form: "project" });
  if (service) params.set("service", service);
  if (source) params.set("source", source);
  return `/contact?${params.toString()}`;
};

export const publicPages: PublicPage[] = [
  {
    path: "work",
    eyebrow: "WORK",
    title: "Proof lives in the system, not the pitch.",
    summary: "A restrained record of public evidence, responsibilities and work that can be verified.",
    sections: [
      { id: "publishing", eyebrow: "PUBLISHING", title: "Publishing systems with a visible public record.", body: "KU Journals has a public interface whose footer credits Airix Media with design, development and maintenance. Broader institutional claims, project scope and outcomes remain withheld until permission and evidence are complete.", details: [{ label: "Evidence", body: "Current public interface and visible footer credit." }, { label: "Boundary", body: "No fabricated metrics, testimonials or institutional outcomes." }], action: { label: "Start a publishing enquiry", href: "/contact?form=publishing&source=/work#publishing" } },
      { id: "digital-experiences", eyebrow: "DIGITAL EXPERIENCES", title: "Interfaces judged by what people can complete.", body: "Public case-study detail remains intentionally limited until authentic interface captures, responsibilities and permissions are ready.", items: ["Web and commerce journeys", "Accessible interaction", "Performance and measurement", "Operational ownership"] },
      { id: "business-systems", eyebrow: "BUSINESS SYSTEMS", title: "Operational work before decorative screens.", body: "The evidence standard covers the problem, system responsibility, constraints and ongoing operation—not a fabricated browser frame.", items: ["Applications and portals", "Workflow automation", "Payments and integrations", "Data and operational handoff"] },
      { id: "infrastructure", eyebrow: "INFRASTRUCTURE", title: "The operating layer is part of the work.", body: "Hosting, access, backups, monitoring, email, domains and recovery are treated as accountable responsibilities. Service commitments remain agreement-specific." },
      { id: "open-source", eyebrow: "OPEN SOURCE", title: "Public code can be inspected directly.", body: "Five verified OJS repositories provide the clearest current source-level proof.", action: { label: "Open the catalogue", href: "/open-source" } },
    ],
    action: { label: "Discuss a related system", href: projectLink(undefined, "/work") },
  },
  {
    path: "services",
    eyebrow: "SERVICES",
    title: "Build. Run. Rescue.",
    summary: "Four connected practices organised around responsibility across the life of the system.",
    sections: [
      { id: "digital-experiences", eyebrow: "01 / DIGITAL EXPERIENCES", title: "Make the first interaction clear, fast and useful.", body: "For websites and commerce journeys that are difficult to understand, slow to change or disconnected from the organisation behind them.", items: ["Capabilities — strategy, content architecture, UX, accessible interface design, engineering, commerce, SEO and performance", "Typical engagements — new platforms, redesigns, service journeys and measured improvement programmes", "Example outcomes — clearer journeys, stronger ownership and a maintainable release path", "Related proof — public work is shown only when interface evidence and permission support it"], visualRoute: "/services/digital-experiences", action: { label: "Discuss Digital Experiences", href: projectLink("Digital Experiences", "/services#digital-experiences") } },
      { id: "business-systems", eyebrow: "02 / BUSINESS SYSTEMS", title: "Move important work through a system people can trust.", body: "For repeated operational work spread across messages, spreadsheets, manual handoffs and disconnected tools.", items: ["Capabilities — custom applications, portals, workflow automation, APIs, payments, dashboards and data migration", "Typical engagements — operating systems, client workspaces, internal tools and integration programmes", "Example outcomes — one clearer record, fewer fragile handoffs and explicit operational responsibility", "Related proof — project relationships and outcomes remain evidence-gated"], visualRoute: "/services/business-systems", action: { label: "Discuss Business Systems", href: projectLink("Business Systems", "/services#business-systems") } },
      { id: "managed-infrastructure", eyebrow: "03 / MANAGED INFRASTRUCTURE", title: "Keep the operating layer visible and recoverable.", body: "For hosting, access, domains, email, backups and providers that have become difficult to govern as one system.", items: ["Capabilities — managed hosting, server administration, DNS, SSL, email, backups, monitoring and hardening", "Typical engagements — managed operations, infrastructure transition, stabilisation and provider coordination", "Example outcomes — documented access, clearer ownership and a tested recovery path", "Related proof — availability and response commitments belong to a verified agreement"], visualRoute: "/services/managed-infrastructure", action: { label: "Discuss Managed Infrastructure", href: projectLink("Managed Infrastructure", "/services#managed-infrastructure") } },
      { id: "support-recovery", eyebrow: "04 / SUPPORT & RECOVERY", title: "Maintain control. Recover it when necessary.", body: "For active systems that need structured maintenance, investigation, migration or controlled recovery.", items: ["Capabilities — maintenance, audits, staged repair, access recovery, migrations, documentation and handover", "Typical engagements — support agreements, failed-project rescue, platform recovery and continuity work", "Example outcomes — restored control, a reliable record and a practical next operating state", "Related proof — timing and outcome depend on diagnosis, access and scope"], visualRoute: "/services/support-recovery", action: { label: "Discuss Support & Recovery", href: projectLink("Support & Recovery", "/services#support-recovery") } },
    ],
    action: { label: "Choose a service route", href: projectLink(undefined, "/services") },
  },
  {
    path: "publishing",
    eyebrow: "PUBLISHING TECHNOLOGY",
    title: "African journals deserve world-class publishing infrastructure.",
    summary: "One complete route through OJS, editorial operations, hosting, pricing, public work and long-term support.",
    sections: [
      { id: "overview", eyebrow: "OVERVIEW", title: "Publishing is an operating system.", body: "The platform connects submissions, people, review, metadata, production, payments, discovery, preservation and institutional responsibility." },
      { id: "ojs", eyebrow: "OPEN JOURNAL SYSTEMS", title: "OJS built around real editorial operations.", body: "Installation, configuration, workflow design, upgrades, migrations and recovery are handled through staging-led change control.", items: ["Single- and multi-journal architecture", "Workflow and role configuration", "Upgrade and migration planning", "Training, documentation and handover"], visualRoute: "/publishing/ojs" },
      { id: "hosting-support", eyebrow: "HOSTING & TECHNICAL SUPPORT", title: "Keep the journal available, secure and supportable.", body: "Hosting, updates, backups, monitoring, security and documentation are operated as one responsibility. Coverage remains package- and agreement-specific." },
      { id: "editorial-support", eyebrow: "EDITORIAL & PRODUCTION", title: "Technology that supports the publishing team.", body: "Workflow configuration, metadata assistance, DOI and Crossref implementation support, documentation and training can be scoped without displacing editorial responsibility." },
      { id: "plugins", eyebrow: "THEMES & PLUGINS", title: "Extend OJS for a verified publishing need.", body: "Themes and plugins are scoped against the exact platform version, workflow, security boundary and maintenance plan.", action: { label: "Inspect public plugins", href: "/open-source" } },
      { id: "universities", eyebrow: "UNIVERSITIES", title: "One foundation. Distinct journals. Clear governance.", body: "Multi-journal programmes need shared infrastructure, onboarding, roles, identity, training and support without erasing journal autonomy." },
      { id: "journal-platforms", eyebrow: "JOURNAL PLATFORMS", title: "Build a platform the publishing team can own.", body: "Shared standards and infrastructure sit alongside appropriate workflow, identity and access boundaries for each journal." },
      { id: "pricing", eyebrow: "PRICING", title: "Starting points for a scoped proposal.", body: "Every public amount begins with “From”. Platform condition, scope, billing country and support requirements determine the final proposal.", visualRoute: "/publishing/pricing" },
      { id: "projects", eyebrow: "SELECTED PUBLISHING WORK", title: "Evidence before narrative.", body: "The current public record supports KU Journals’ live interface and visible Airix Media footer credit. Unsupported scope, metrics and outcomes remain withheld.", action: { label: "View publishing work", href: "/work#publishing" } },
      { id: "resources", eyebrow: "RESOURCES", title: "Useful guidance, published only when it is real.", body: "Guides and downloadable material remain unavailable until ownership, accessibility, maintenance and versioning are verified." },
    ],
    action: { label: "Start a publishing enquiry", href: "/contact?form=publishing&source=/publishing" },
  },
  {
    path: "studio",
    eyebrow: "STUDIO",
    title: "Small by design. Accountable by practice.",
    summary: "Airix Media is a boutique creative technology studio and digital operations partner within Airix 360.",
    sections: [
      { id: "studio", eyebrow: "WHO WE ARE", title: "Senior attention across the life of the system.", body: "Airix Media brings strategy, design, engineering, infrastructure, publishing technology and support into one accountable practice." },
      { id: "airix-360", eyebrow: "AIRIX 360", title: "A studio within a wider operating group.", body: "Airix Media is described as part of Airix 360 at brand level. Final entity, jurisdiction and legal language remain subject to verification." },
      { id: "atlas", eyebrow: "AIRIX ATLAS", title: "Invisible systems. Visible progress.", body: "Build worlds, not pages. Atlas is the operating philosophy that connects strategy, digital experiences, business systems, infrastructure, publishing and support as parts of one living environment.", details: [{ label: "Build", body: "Shape the experience and the system behind it." }, { label: "Run", body: "Keep ownership, access and operation visible." }, { label: "Rescue", body: "Restore control through evidence and staged recovery." }], visualRoute: "/atlas" },
      { id: "principles", eyebrow: "WORKING PRINCIPLES", title: "Clarity before spectacle. Evidence before claims.", body: "Airix works with organisations that depend on digital systems to publish, serve customers, coordinate work or maintain critical operations.", items: ["Start with the operating problem", "Make responsibility visible", "Design for access and handover", "Test change away from production", "Keep support and recovery routes explicit", "Build for the long term, not only launch day"] },
      { id: "organisations", eyebrow: "WHO WE WORK WITH", title: "Organisations whose work continues after the website launches.", body: "Publishing organisations, universities, growing businesses, institutions and service teams that need a dependable digital operating partner." },
    ],
    action: { label: "Discuss a project", href: projectLink(undefined, "/studio") },
  },
  {
    path: "open-source",
    eyebrow: "OPEN SOURCE",
    title: "Useful publishing infrastructure, improved in public.",
    summary: "One verified catalogue for five public OJS projects, their source, compatibility evidence and limitations.",
    sections: [{ id: "catalogue", eyebrow: "PUBLIC CATALOGUE", title: "Inspect the work at source.", body: "Repository facts are maintained in one editable typed data structure. Unknown compatibility, support and maintenance claims are omitted rather than guessed." }],
  },
  {
    path: "contact",
    eyebrow: "CONTACT",
    title: "Start with the conversation you actually need.",
    summary: "Six focused routes replace one oversized form. Choose a purpose, provide useful context and keep urgent work visible.",
    sections: [{ id: "contact-options", eyebrow: "ENQUIRY ROUTES", title: "Choose the right starting point.", body: "Each route keeps only the fields needed for useful triage. Nothing is described as sent unless a configured provider accepts it." }],
  },
  {
    path: "support",
    eyebrow: "SUPPORT",
    title: "The system should remain understandable after launch.",
    summary: "Maintenance, investigation, recovery and guidance grounded in the active system and agreement.",
    sections: [
      { id: "request-support", eyebrow: "REQUEST SUPPORT", title: "Describe the affected system and its impact.", body: "Existing clients should use the Client Portal for work tied to an active agreement. New requests can begin through the technical-support form.", action: { label: "Request technical support", href: "/contact?form=support&source=/support#request-support" } },
      { id: "what-to-include", eyebrow: "WHAT TO INCLUDE", title: "A useful first record shortens diagnosis.", body: "Include the affected URL or system, symptoms, timing, recent changes, access state, business impact, error details and available backups." },
      { id: "service-levels", eyebrow: "SERVICE LEVELS", title: "Commitments belong to the agreement.", body: "Response confirms receipt and triage. Resolution depends on diagnosis, access, dependencies, scope and the purchased support arrangement." },
      { id: "guides", eyebrow: "GUIDES", title: "A focused support library, not an empty knowledge base.", body: "Verified guidance will be published as real operational material becomes available, owned and maintained." },
      { id: "security-reporting", eyebrow: "SECURITY REPORTING", title: "Report suspected security issues privately.", body: "Use the security route without including credentials or secrets in the initial message.", action: { label: "Review security guidance", href: "/security" } },
      { id: "emergency", eyebrow: "EMERGENCY", title: "Keep critical incidents on a direct route.", body: "Unavailable, compromised, corrupted or publication-blocking systems should use the dedicated emergency page.", visualRoute: "/services/support-recovery", action: { label: "Open Emergency Support", href: "/support/emergency" } },
    ],
  },
  {
    path: "support/emergency",
    eyebrow: "EMERGENCY RECOVERY",
    title: "Describe what failed and what is at risk.",
    summary: "For unavailable, compromised, corrupted or severely impaired production systems. Submission does not guarantee immediate response or resolution.",
    sections: [
      { id: "instructions", eyebrow: "FIRST RECORD", title: "Keep the first report short and operational.", body: "Share the affected service, outage state, security concern, publication impact, when the incident began and the safest urgent contact route." },
      { id: "response-boundary", eyebrow: "RESPONSE BOUNDARY", title: "Emergency work may be chargeable.", body: "Coverage, availability, timing and resolution depend on diagnosis, access and the active agreement. Do not send passwords, API keys or recovery codes." },
      { id: "emergency-form", eyebrow: "EMERGENCY FORM", title: "Prepare the incident record now.", body: "The dedicated form keeps emergency details separate from general enquiries.", action: { label: "Open Emergency Support form", href: "/contact?form=emergency&source=/support/emergency" } },
    ],
    action: { label: "Open Emergency Support form", href: "/contact?form=emergency&source=/support/emergency" },
  },
];

export function getPublicPage(path: string) {
  return publicPages.find((page) => page.path === path) ?? null;
}

export const publishingPrices = [
  ["OJS setup", "From ₦150,000"],
  ["Migration", "From ₦200,000"],
  ["Theme and branding", "From ₦150,000"],
  ["Managed hosting", "From ₦300,000/year"],
  ["Support and maintenance", "From ₦150,000/year"],
  ["Training", "From ₦100,000/session"],
  ["Custom plugin development", "Quoted based on requirements"],
] as const;
