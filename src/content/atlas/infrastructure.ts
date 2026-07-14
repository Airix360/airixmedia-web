import type { ProjectEvidence } from "@/content/atlas/landmarks";
import type { ServicePathwayContent } from "@/components/atlas/services";

export interface OperatingLayerRecord { id: string; index: string; name: string; role: string; dependency: string }
export interface RecoveryStage { id: string; index: string; name: string; action: string; limit: string }

export const infrastructurePathways: readonly ServicePathwayContent[] = [
  {
    id: "hosting-operating-environments", index: "01", name: "Hosting and operating environments",
    summary: "The environments, addressing, and communications beneath a public system.",
    covers: ["Managed hosting", "Cloud and VPS administration", "Domains and DNS", "Business and transactional email", "Server and environment administration"],
    needs: ["A system without clear infrastructure ownership", "Hosting or server administration that needs one accountable scope", "Domains, DNS, or email that must remain coordinated with the application"],
    mayBuild: ["Configure and administer agreed hosting environments", "Coordinate domain, DNS, and email configuration", "Document environment access and operating responsibility"],
    route: "/services/managed-infrastructure", routeLabel: "Managed Infrastructure", evidenceStatus: "repository_record",
    sources: ["src/lib/content.ts · Managed Infrastructure", "src/lib/pages.ts · services/managed-infrastructure"],
  },
  {
    id: "monitoring-maintenance-continuity", index: "02", name: "Monitoring, maintenance, and continuity",
    summary: "Recurring care that keeps the condition of a system visible and its ownership explicit.",
    covers: ["Monitoring", "Updates and maintenance", "Backups", "Technical audits and health checks", "Ongoing improvement", "Continuity planning"],
    needs: ["A system that changes after launch", "Backups, updates, and monitoring without clear ownership", "Recurring technical work that needs an agreed route"],
    mayBuild: ["Scope monitoring and backup responsibilities", "Maintain and update agreed systems", "Run technical reviews", "Document continuity and improvement work"],
    route: "/support", routeLabel: "Support", evidenceStatus: "repository_record",
    sources: ["src/lib/content.ts · Managed Infrastructure and Support and Recovery", "src/lib/pages.ts · support and services/support-recovery", "docs/DEPLOYMENT.md · /health prototype check"],
  },
  {
    id: "security-recovery", index: "03", name: "Security and recovery",
    summary: "Controlled access, hardening, backup-led recovery, and remediation within an agreed technical scope.",
    covers: ["Security hardening", "Controlled access", "Backups and recovery", "Malware recovery", "Technical audit and remediation", "Compromise response"],
    needs: ["A system that is compromised or difficult to control", "Access and ownership that need to be clarified", "A recovery path that depends on available backups and diagnosis"],
    mayBuild: ["Review access and technical condition", "Harden agreed systems", "Restore from available backups where feasible", "Diagnose and remediate within confirmed scope"],
    route: "/services/support-recovery", routeLabel: "Support and Recovery", evidenceStatus: "repository_record",
    sources: ["src/lib/content.ts · Security hardening and Malware recovery", "src/lib/pages.ts · security and services/support-recovery"],
  },
  {
    id: "integrations-automation", index: "04", name: "Integrations and automation",
    summary: "Dependable handoffs between interfaces, platforms, data, email, payments, external services, and the people responsible next.",
    covers: ["APIs and integrations", "Workflow automation", "Data handoffs", "Email systems", "Payment connections", "External service coordination"],
    needs: ["Repeated manual transfer between systems", "A customer action that must reach an operating team", "External services that need a defined connection and owner"],
    mayBuild: ["Connect agreed APIs and services", "Automate defined workflow handoffs", "Coordinate email and payment integrations", "Document dependencies and operating ownership"],
    route: "/services/business-systems", routeLabel: "Business Systems", evidenceStatus: "repository_record",
    sources: ["src/lib/content.ts · Business Systems", "src/lib/pages.ts · services/business-systems and services/managed-infrastructure"],
  },
  {
    id: "migration-rescue", index: "05", name: "Migration and rescue",
    summary: "A controlled route for systems that need to move, recover, or become supportable again.",
    covers: ["Website and platform migration", "Data migration", "Failed-project rescue", "Emergency recovery", "Upgrade planning", "Troubleshooting and handover"],
    needs: ["A platform moving between environments", "A failed or impaired production system", "A project that needs access, dependencies, and ownership reconstructed"],
    mayBuild: ["Audit the current system and access", "Plan and execute an agreed migration", "Diagnose failed delivery or production state", "Document the repaired or transferred system"],
    route: "/services/support-recovery", routeLabel: "Support and Recovery", evidenceStatus: "repository_record",
    sources: ["src/lib/content.ts · Data migration, Failed-project rescue, Platform migrations", "src/lib/pages.ts · services/support-recovery and support/emergency"],
  },
  {
    id: "support-ownership", index: "06", name: "Support and ownership",
    summary: "Named technical responsibility for troubleshooting, maintenance, documentation, improvement, and continuity.",
    covers: ["Technical support", "Troubleshooting", "Maintenance and updates", "Documentation", "Ongoing improvement", "Platform continuity"],
    needs: ["A system without a clear technical owner", "Recurring issues that need an accountable support path", "A handoff that must leave useful documentation"],
    mayBuild: ["Provide support within an agreed package", "Maintain and improve confirmed systems", "Document access, dependencies, and responsibility", "Coordinate providers without claiming control of them"],
    route: "/support", routeLabel: "Support", evidenceStatus: "repository_record",
    sources: ["src/lib/pages.ts · support, service-levels, services/managed-infrastructure", "docs/CONTENT_GAPS.md · package-specific commitments missing"],
  },
] as const;

export const operatingLayers: readonly OperatingLayerRecord[] = [
  { id: "experience", index: "01", name: "Public experience", role: "The website, portal, application, or publishing platform people can reach.", dependency: "Depends on every operating layer below it." },
  { id: "application", index: "02", name: "Application or platform", role: "The software, configuration, roles, and workflow that perform the service.", dependency: "Depends on data, integrations, addressing, and its environment." },
  { id: "data", index: "03", name: "Data and files", role: "The records and files the system reads, changes, stores, or transfers.", dependency: "Requires controlled access, backup responsibility, and an agreed recovery path." },
  { id: "integrations", index: "04", name: "Integrations and handoffs", role: "APIs, payments, email, and external services move information to the next responsible system or person.", dependency: "Requires defined providers, credentials, failure states, and ownership." },
  { id: "addressing", index: "05", name: "Domains, DNS, and email", role: "Addressing and communications connect people and services to the correct destination.", dependency: "Requires provider coordination and controlled configuration." },
  { id: "environment", index: "06", name: "Hosting and server environment", role: "Managed hosting, cloud, or VPS administration provides the operating environment.", dependency: "Requires agreed access, administration, security, and maintenance." },
  { id: "continuity", index: "07", name: "Monitoring, backups, and support", role: "Visibility, backup responsibility, maintenance, and support keep condition and next action explicit.", dependency: "Exact coverage and commitments are defined during project scoping." },
] as const;

export const continuityStates = [
  { name: "Monitored", detail: "Monitoring scope and signals are defined for the system.", terms: "Coverage and interval: Defined during project scoping." },
  { name: "Maintained", detail: "Updates and recurring maintenance receive named ownership.", terms: "Maintenance inclusions: Defined during project scoping." },
  { name: "Backed up", detail: "Backup responsibility and usable restoration inputs are identified.", terms: "Frequency, retention, and restoration terms: Defined during project scoping." },
  { name: "Reviewed", detail: "Technical condition, risk, and improvement needs can be assessed.", terms: "Review cadence: Defined during project scoping." },
  { name: "Supported", detail: "Issues enter an agreed support and triage route.", terms: "Coverage, response, and escalation: Defined during project scoping." },
] as const;

export const recoveryRoute: readonly RecoveryStage[] = [
  { id: "report", index: "01", name: "Report and detect", action: "Record the affected URL or system, symptoms, impact, timing, recent changes, access, and available backups.", limit: "The initial report establishes context; it does not establish cause." },
  { id: "stabilise", index: "02", name: "Stabilise", action: "Take the scoped steps available to reduce further change or preserve useful evidence and access.", limit: "The safe action depends on the system, access, provider, and incident." },
  { id: "assess", index: "03", name: "Assess", action: "Inspect condition, dependencies, access, recent changes, and viable recovery inputs.", limit: "An initial diagnostic may be chargeable and may identify additional scope." },
  { id: "restore", index: "04", name: "Restore or repair", action: "Use the agreed recovery, migration, remediation, or repair path supported by the diagnosis.", limit: "No outcome or recovery time is guaranteed by this review model." },
  { id: "verify", index: "05", name: "Verify", action: "Check the repaired or restored system against the agreed critical behaviours.", limit: "Verification scope depends on access, dependencies, and the affected system." },
  { id: "improve", index: "06", name: "Document and improve", action: "Record responsibility, dependencies, changes, and follow-up work that may reduce future risk.", limit: "Ongoing improvement requires separately agreed ownership." },
] as const;

export const integrationTransit = [
  { name: "Website or portal", handoff: "Captures an enquiry, account action, order, submission, or request." },
  { name: "Application or platform", handoff: "Applies the relevant workflow and access rules." },
  { name: "Data store", handoff: "Records the agreed system state and files." },
  { name: "Payment or external service", handoff: "Receives and returns the information required for its defined role." },
  { name: "Email and notification", handoff: "Carries an agreed message to the next person or system." },
  { name: "Operational owner", handoff: "Receives a clear next action and remains accountable for the human decision." },
  { name: "Support route", handoff: "Keeps failures, dependencies, and improvement work within named scope." },
] as const;

export const infrastructureResponsibility = {
  need: ["Operating systems need clear access, dependencies, providers, support routes, and ownership."],
  responsibility: ["Airix may configure, migrate, monitor, maintain, repair, document, support, and improve agreed systems within a confirmed scope."],
  exclusions: ["Airix does not control third-party outages. This review promises no uninterrupted service, support window, response time, recovery time, backup frequency, security certification, forensic service, or guaranteed outcome."],
} as const;

export const infrastructureEvidence: readonly ProjectEvidence[] = [
  { label: "Managed hosting, cloud and VPS administration, domains, DNS, email, backups, monitoring, and security hardening are recorded service areas.", type: "Service scope", status: "repository_record", source: "src/lib/content.ts and src/lib/pages.ts · Managed Infrastructure" },
  { label: "Maintenance, audits, migrations, recovery, failed-project rescue, malware recovery, documentation, and improvement are recorded support areas.", type: "Continuity scope", status: "repository_record", source: "src/lib/content.ts and src/lib/pages.ts · Support and Recovery" },
  { label: "Package coverage, response commitments, backup terms, delivery windows, and renewals require owner confirmation and an active agreement.", type: "Commercial terms", status: "placeholder", source: "docs/CONTENT_GAPS.md and docs/OWNER_REVIEW_CHECKLIST.md" },
] as const;

export const emergencyRecord = {
  href: "/support/emergency",
  heading: "Production system unavailable, compromised, corrupted, or severely impaired?",
  instruction: "Go directly to Emergency Recovery and describe the affected system clearly.",
  provide: ["Affected URL and system", "What users see", "When it started", "Recent changes", "Impact", "Available access and backups"],
  limits: ["An initial diagnostic may be chargeable.", "Response depends on availability and the active package.", "Submitting outside business hours does not guarantee an immediate human response or resolution."],
  missing: ["No public emergency response time is verified.", "No public availability window is verified.", "No 24/7 commitment or guaranteed resolution is verified."],
} as const;
