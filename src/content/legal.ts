export type LegalSection = { id?: string; title: string; body: string };
export type LegalDocument = { path: "legal" | "privacy" | "terms" | "service-terms" | "security" | "data-processing" | "subprocessors"; name: string; purpose: string; eyebrow: string; title: string; summary: string; effectiveDate: string; version: string; sections: LegalSection[] };

export const legalReviewStatus = "Draft for qualified legal review · Last updated 18 July 2026";

export const legalDocuments: LegalDocument[] = [
  { path: "legal", name: "Legal centre", purpose: "Directory of public legal and policy information.", eyebrow: "AIRIX MEDIA / LEGAL", title: "The policies behind a responsible service.", summary: "A concise centre for legal documents, browser storage, accessibility, acceptable use and legal contact information.", effectiveDate: "18 July 2026", version: "2.3.0.0", sections: [
    { id: "overview", title: "Legal overview", body: "Privacy, website terms, service terms, security, data processing and subprocessors remain independently linkable. Final entity, jurisdiction and governing-law language require qualified review." },
    { id: "directory", title: "Policy directory", body: "Use the legal navigation on this page to open each standalone policy. Project proposals and signed agreements remain authoritative for paid work." },
    { id: "cookies", title: "Cookies and local storage", body: "The public site does not load advertising, session replay, analytics, embedded calendars or chat services. A manual Light or Dark choice may be stored under the airix-theme local-storage key. Automatic mode uses local device time without geolocation or a network time service." },
    { id: "accessibility", title: "Accessibility", body: "Airix targets WCAG 2.2 AA with semantic structure, keyboard support, visible focus, useful alternatives, reduced motion and responsive interaction. Report a barrier to hello@airixmedia.com with the page, task, device or assistive technology; no guaranteed response time is promised." },
    { id: "acceptable-use", title: "Acceptable use", body: "Do not attack, scan, overload, scrape abusively, bypass access controls, upload malicious material, impersonate, harass or use automated traffic to interfere with the public site, forms, portals or connected systems." },
    { id: "contact", title: "Legal contact", body: "For legal or policy questions, contact hello@airixmedia.com. Do not send credentials, secrets or sensitive personal information in an initial message." },
    { id: "version", title: "Effective date and version", body: "Effective 18 July 2026 · version 2.3.0.0. Material changes should update both the effective date and document version." },
  ] },
  { path: "privacy", name: "Privacy", purpose: "How enquiry and contact information is handled.", eyebrow: "AIRIX MEDIA / PRIVACY", title: "A record of what we receive and why.", summary: "This draft maps information received through enquiries, support routes and direct channels without inventing a controller identity or retention period.", effectiveDate: "18 July 2026", version: "2.3.0.0", sections: [
    { title: "Controller field", body: "The final legal entity, controller identity, registered address and jurisdiction remain unresolved and must be completed by the owner and qualified counsel." },
    { title: "Information and purposes", body: "Potential information includes contact details, organisation context, project requirements, URLs, support context, uploaded material and communications. Purposes may include responding, scoping, delivering an agreed service, security and records management." },
    { title: "Basis, providers and transfers", body: "Lawful basis, processors, international transfers, retention and deletion schedules require region-specific legal review. No analytics or session replay loads in this prototype." },
    { title: "Rights and contact", body: "Requests about access, correction, deletion, objection or portability should use the verified privacy contact once the controller route is approved. Children’s data and automated decision-making require explicit review." },
  ] },
  { path: "terms", name: "Terms", purpose: "General website and business terms.", eyebrow: "AIRIX MEDIA / TERMS", title: "Use the site clearly and responsibly.", summary: "General terms for public information, enquiries, intellectual property, third-party links and preliminary business conversations.", effectiveDate: "18 July 2026", version: "2.3.0.0", sections: [
    { title: "Website and enquiries", body: "The site provides general information and preliminary enquiry routes. A quotation, proposal or project agreement exists only when confirmed in writing." },
    { title: "Conduct and content", body: "Do not misuse the site, probe restricted systems, submit unlawful material, impersonate another person or send credentials through forms or public channels." },
    { title: "Intellectual property", body: "Airix Media and its licensors retain rights in site content, design and code except where a separate licence or agreement says otherwise." },
    { title: "Third parties and limits", body: "Links and handoffs may lead to third-party services. Availability, accuracy and responsibility for those services require separate verification. Limitation, governing-law and jurisdiction language remain counsel-review fields." },
  ] },
  { path: "service-terms", name: "Service Terms", purpose: "Framework for paid project and support services.", eyebrow: "AIRIX MEDIA / SERVICE TERMS", title: "Scope and responsibility before delivery.", summary: "The subjects a proposal and signed service agreement must settle before paid work begins.", effectiveDate: "18 July 2026", version: "2.3.0.0", sections: [
    { title: "Scope, proposals and deposits", body: "A proposal should record scope, assumptions, exclusions, deliverables, acceptance, deposit and payment schedule before work begins." },
    { title: "Timelines, revisions and client responsibilities", body: "Timing depends on access, content, approvals, lawful materials and timely decisions. Revision rounds and change control should be explicit." },
    { title: "Third-party services, hosting and support", body: "Provider fees, licences, infrastructure, hosting, backups, support coverage and response commitments depend on the purchased service and written agreement." },
    { title: "Suspension and termination", body: "Payment default, security risk, unlawful use, unavailable client dependencies and termination assistance require project-specific language." },
    { title: "Intellectual property", body: "Ownership, licences, pre-existing materials, open-source components and portfolio rights must be stated in the signed agreement." },
    { title: "Warranties and liability", body: "Warranty, indemnity, liability cap, governing law and dispute language remain qualified-counsel review fields and are not invented here." },
  ] },
  { path: "security", name: "Security", purpose: "Operational trust and procurement information.", eyebrow: "AIRIX MEDIA / SECURITY", title: "Security is an operating practice.", summary: "A practical view of access, infrastructure, recovery, vulnerability handling and shared responsibility without invented certifications.", effectiveDate: "18 July 2026", version: "2.3.0.0", sections: [
    { title: "Access management", body: "Access should be least-privilege, individually attributable, reviewed at handoff and removed when no longer required. Exact controls remain service-specific." },
    { title: "Infrastructure security", body: "Secure configuration, transport protection, updates, provider controls and environment separation depend on the deployed stack and agreement." },
    { title: "Backups and monitoring", body: "Backup scope, retention, restoration tests and monitoring coverage must be documented for the service. No universal recovery or uptime claim is made." },
    { title: "Vulnerability handling", body: "Suspected vulnerabilities should be reported privately to hello@airixmedia.com without credentials, exploit publication or sensitive production data." },
    { title: "Incident response", body: "Triage, containment, evidence preservation, recovery and communication depend on access, impact, providers and the active support arrangement." },
    { title: "Client responsibilities", body: "Clients remain responsible for lawful use, appropriate user access, timely decisions, secure credential handling and following agreed operational procedures." },
  ] },
  { path: "data-processing", name: "Data Processing", purpose: "Controller, processor and DPA framework.", eyebrow: "AIRIX MEDIA / DATA PROCESSING", title: "Data roles should be explicit.", summary: "A project-specific data-processing agreement may be available where Airix processes information for a client.", effectiveDate: "18 July 2026", version: "2.3.0.0", sections: [
    { title: "Roles and instructions", body: "The client’s controller or equivalent role, Airix’s processor role, documented instructions, confidentiality and security measures depend on the project and applicable law." },
    { title: "Subprocessors and transfers", body: "Any subprocessors, locations, international transfers, deletion or return schedule and incident communication must be recorded in the project agreement." },
    { title: "DPA framework", body: "Subject matter, duration, processing purpose, data categories, data-subject categories, assistance, deletion, audit and notification terms require a signed project-specific schedule." },
  ] },
  { path: "subprocessors", name: "Subprocessors", purpose: "Provider register for customer or visitor data.", eyebrow: "AIRIX MEDIA / SUBPROCESSORS", title: "A register with no invented providers.", summary: "A provider appears only after its processing role, purpose and available location information are verified.", effectiveDate: "18 July 2026", version: "2.3.0.0", sections: [
    { title: "Confirmed provider register", body: "No universal production subprocessor is confirmed for publication in this prototype. The editable register remains intentionally empty rather than inferring providers from unrelated infrastructure evidence." },
    { title: "Required fields", body: "Each future entry must record confirmed provider, service purpose, processing category, region or location where known, status and last-reviewed date." },
    { title: "Change notification", body: "A final notice will explain how material provider changes are reviewed and communicated. Project-specific providers may differ." },
  ] },
];

export function getLegalDocument(path: string) { return legalDocuments.find((document) => document.path === path) ?? null; }
