import type { ProjectEvidence } from "@/content/atlas/landmarks";

export type CommerceEvidenceStatus = "repository_record" | "proposed_internal";

export interface CommerceServicePathway {
  id: "digital-experiences" | "commerce-systems" | "payments-integrations" | "business-portals";
  index: string;
  name: string;
  summary: string;
  covers: readonly string[];
  needs: readonly string[];
  mayBuild: readonly string[];
  route: string;
  routeLabel: string;
  evidenceStatus: CommerceEvidenceStatus;
  sources: readonly string[];
}

export const commerceServicePathways: readonly CommerceServicePathway[] = [
  {
    id: "digital-experiences",
    index: "01",
    name: "Digital experiences",
    summary: "Public-facing systems shaped around clarity, access, performance, and the journeys people need to complete.",
    covers: ["Websites", "Customer-facing web applications", "Responsive design", "Content and service journeys"],
    needs: ["A clearer public experience", "A service that works across devices", "A useful path from information to action"],
    mayBuild: ["Website strategy and development", "UX and interface design", "Accessible responsive interfaces", "Content and service journeys"],
    route: "/services/digital-experiences",
    routeLabel: "Digital Experiences",
    evidenceStatus: "repository_record",
    sources: ["src/lib/content.ts · Digital Experiences", "src/lib/pages.ts · services/digital-experiences"],
  },
  {
    id: "commerce-systems",
    index: "02",
    name: "Commerce systems",
    summary: "The customer and operational layers through which products, orders, access, and account activity can move.",
    covers: ["E-commerce", "Catalogues", "Checkout and ordering", "Customer accounts", "Operational commerce workflows"],
    needs: ["Products or services that must be found and ordered", "A coherent customer account journey", "Clearer movement between order and operation"],
    mayBuild: ["Commerce experiences", "Catalogue and ordering structures", "Checkout and account journeys", "Operational commerce workflows"],
    route: "/services/digital-experiences",
    routeLabel: "Digital Experiences",
    evidenceStatus: "proposed_internal",
    sources: ["src/lib/content.ts · E-commerce", "W3 structural scope · catalogue, checkout, ordering and accounts require owner confirmation"],
  },
  {
    id: "payments-integrations",
    index: "03",
    name: "Payments and integrations",
    summary: "Connections that let transactions, data, and decisions reach the systems responsible for the next action.",
    covers: ["Payment connections", "Business-system integrations", "APIs", "Data handoffs", "Automation", "External service connections"],
    needs: ["Systems that currently stop at organisational boundaries", "Repeated manual transfer between tools", "A dependable handoff after a customer action"],
    mayBuild: ["API and payment integrations", "Workflow automation", "Data movement between agreed systems", "External service connections"],
    route: "/services/business-systems",
    routeLabel: "Business Systems",
    evidenceStatus: "repository_record",
    sources: ["src/lib/content.ts · Business Systems", "src/lib/pages.ts · services/business-systems"],
  },
  {
    id: "business-portals",
    index: "04",
    name: "Business portals and operating systems",
    summary: "Working environments for teams, clients, approvals, information, and recurring operational activity.",
    covers: ["Internal portals", "Client portals", "Operational dashboards", "Workflow systems", "Connected operational tools"],
    needs: ["Work fragmented across messages and spreadsheets", "Different roles needing one controlled view", "Recurring processes that need clearer ownership"],
    mayBuild: ["Custom web applications", "Client and staff portals", "Operational dashboards", "Workflow systems and automation"],
    route: "/services/business-systems",
    routeLabel: "Business Systems",
    evidenceStatus: "repository_record",
    sources: ["src/lib/content.ts · Business Systems", "src/lib/pages.ts · services/business-systems"],
  },
] as const;

export const commerceExchange = [
  { name: "Discovery", detail: "Understand the people, service, product, and operating constraints." },
  { name: "Interface", detail: "Give each person a clear place to understand and act." },
  { name: "Transaction", detail: "Capture the intended request, order, account action, or payment handoff." },
  { name: "Handoff", detail: "Move the right information to the responsible system or team." },
  { name: "Fulfilment", detail: "Support the operational work that follows the customer action." },
  { name: "Support", detail: "Maintain, monitor, and improve the connected system after launch." },
] as const;

export const connectedCommerceSystem = [
  { name: "Customer-facing experience", role: "People discover, understand, sign in, enquire, or order." },
  { name: "Commerce or portal layer", role: "The system applies the relevant catalogue, account, form, or workflow rules." },
  { name: "Payment connection", role: "Where required, a transaction is handed to an agreed payment service." },
  { name: "Data record", role: "The resulting state is recorded for the next responsible process." },
  { name: "External integration", role: "Agreed APIs or services receive and return the data they require." },
  { name: "Operational handoff", role: "A person or operating system receives a clear next action." },
  { name: "Support and maintenance", role: "The connected system is maintained, monitored, and improved within agreed scope." },
] as const;

export const commerceContinuity = {
  need: ["A connected system needs named ownership beyond its launch date."],
  responsibility: ["Airix may scope maintenance, monitoring, improvement, support, integration upkeep, and continuity around the system delivered."],
  exclusions: ["No package, service level, response time, uptime, price, or support term is promised by this review slice."],
} as const;

export const commerceContinuityEvidence: readonly ProjectEvidence[] = [
  {
    label: "Ongoing maintenance is listed within the Support and Recovery practice.",
    type: "Service scope",
    status: "repository_record",
    source: "src/lib/content.ts · Support and Recovery",
  },
  {
    label: "Monitoring and ongoing improvement appear in the current recommendation and service records.",
    type: "Continuity scope",
    status: "repository_record",
    source: "src/lib/selector.ts and src/lib/pages.ts",
  },
  {
    label: "Exact continuity packages, commitments, and commercial terms require owner approval.",
    type: "Commercial terms",
    status: "placeholder",
    source: "docs/CONTENT_GAPS.md and docs/OWNER_REVIEW_CHECKLIST.md",
  },
] as const;
