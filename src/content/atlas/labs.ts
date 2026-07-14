export const labsProjects = [
  { slug: "paystack-ojs", name: "OJS Paystack Payment Gateway", problem: "Connect OJS 3.5 payment activity to Paystack-hosted checkout with server-side verification before fulfilment.", repository: "https://github.com/thathman/PaystackOJS", release: "v1.1.1.0", published: "2026-06-10", compatibility: "README: OJS 3.5.0+ and PHP 8.1+", licence: "GPL-3.0", language: "PHP", maintenance: "Public, not archived; repository updated 2026-06-14.", limitation: "README header says 1.1.0 while the latest GitHub release is v1.1.1.0. Paystack account eligibility controls available currencies." },
  { slug: "ojs-magic-login", name: "OJS Magic Login", problem: "Passwordless sign-in for OJS 3.5 using one-time email links.", repository: "https://github.com/thathman/ojs-magic-login", release: "v1.2.1", published: "2026-06-03", compatibility: "Repository description states OJS 3.5; exact matrix requires README review before broader claims.", licence: "GPL-3.0", language: "PHP", maintenance: "Public, not archived; repository updated 2026-06-10.", limitation: "No adoption, support commitment, or broader compatibility is claimed." },
  { slug: "submission-fee", name: "Submission Fee for OJS", problem: "Charge an author at submission through the journal's configured payment gateway.", repository: "https://github.com/thathman/submissionFee-OJS", release: "v1.4.0.0", published: "2026-06-13", compatibility: "Repository description states OJS 3.5; exact configuration remains repository-defined.", licence: "GPL-3.0", language: "PHP", maintenance: "Public, not archived; repository updated 2026-06-14.", limitation: "No usage volume, institutional adoption, or guaranteed support route is published here." },
  { slug: "multipay", name: "MultiPay for OJS", problem: "Route OJS 3.5 payments across supported gateways according to currency.", repository: "https://github.com/thathman/ojs-multipay", release: "v1.0.2.0", published: "2026-06-11", compatibility: "Repository description states OJS 3.5; provider configuration remains installation-specific.", licence: "GPL-3.0", language: "PHP", maintenance: "Public, not archived; repository updated 2026-06-14.", limitation: "No universal provider availability, roadmap, transaction volume, or support guarantee is claimed." },
  { slug: "request-waiver", name: "Request Waiver for OJS", problem: "Let authors request a submission or publication fee waiver during the OJS 3.5 workflow.", repository: "https://github.com/thathman/ojs-request-waiver", release: "v1.0.0.0", published: "2026-06-13", compatibility: "Repository description states OJS 3.5; exact workflow and notifications remain repository-defined.", licence: "GPL-3.0", language: "PHP", maintenance: "Public, not archived; repository updated 2026-06-14.", limitation: "No adoption, equity outcome, institutional use, roadmap, or support guarantee is claimed." },
] as const;

export const experimentRoute = [
  ["01", "Problem", "State the operating problem without inventing demand or adoption."],
  ["02", "Prototype", "Make the smallest useful route or module that can be inspected."],
  ["03", "Test", "Check behaviour, failure states, compatibility, and evidence."],
  ["04", "Document", "Record installation, version, constraints, and contribution context."],
  ["05", "Release", "Publish a tagged state only when the repository supports the claim."],
  ["06", "Maintain", "Keep status and limitations visible; do not imply a support guarantee."],
] as const;

export const labsEvidenceDate = "2026-07-14";
