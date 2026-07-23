export const trustRegister = [
  { index: "01", title: "Working principles", status: "Repository and Atlas record", detail: "Clarity, ownership, responsiveness, accessibility, thoughtful technical decisions, and responsibility after launch." },
  { index: "02", title: "Evidence standard", status: "Implemented publication model", detail: "Verified, owner-confirmed, inferred-needs-review, placeholder, and do-not-publish states keep confidence proportional to evidence." },
  { index: "03", title: "Maintenance and continuity", status: "Scope record; terms vary", detail: "Maintenance, monitoring, backups, support, recovery, and improvement are named capabilities. Coverage and commitments require an agreement." },
  { index: "04", title: "Security posture", status: "Repository posture only", detail: "Controlled access, secure defaults, backups, monitoring, recovery, and documented responsibility are stated design intentions—not certifications or universal controls." },
  { index: "05", title: "Accessibility intent", status: "Product target", detail: "The product targets WCAG 2.2 AA through semantic structure, keyboard access, visible focus, contrast, and reduced-motion equivalents." },
  { index: "06", title: "Open-source evidence", status: "Public repository evidence", detail: "Public repositories, releases, compatibility notes, and limitations may be inspected directly; adoption and support guarantees are not inferred." },
] as const;

export const evidenceStandards = [
  { state: "Source captured", meaning: "A current public surface, file, repository, release, or visible responsibility statement was inspected." },
  { state: "Repository recorded", meaning: "The implementation repository states the capability or posture; it is not automatically a delivered-project outcome." },
  { state: "Owner confirmed", meaning: "The owner has explicitly approved the fact for its intended publication context." },
  { state: "Proposed", meaning: "Internal explanatory structure awaiting content and visual approval." },
  { state: "Missing", meaning: "The page names the gap instead of filling it with a promise." },
] as const;

export const responsibilityBoundaries = [
  ["Airix responsibility", "The confirmed design, implementation, documentation, operation, or support scope Airix accepts."],
  ["Client responsibility", "Context, approvals, lawful content, organisational decisions, access, and agreed dependencies."],
  ["Provider dependency", "Availability, rules, pricing, and behaviour of third-party platforms remain outside Airix control."],
  ["Unverified", "Certifications, guarantees, testimonials, response times, uptime, customer totals, awards, and outcomes are not claimed."],
] as const;

export const knownTrustLimitations = [
  "Final legal language, entity details, jurisdictions, and addresses still require verification.",
  "Privacy and security pages state intent and operating posture; they do not establish certification or universal controls.",
  "Support coverage, response commitments, backup terms, and recovery targets remain package- and agreement-dependent.",
  "Case-study approval, responsibility, and outcome evidence remain incomplete for several candidate projects.",
  "Generated Atlas artwork remains candidate and is not client evidence.",
] as const;
