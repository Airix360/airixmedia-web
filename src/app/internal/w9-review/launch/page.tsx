import { W9ReviewShell, w9Styles as styles } from "@/components/atlas-w9/W9ReviewShell";
import { publicPages } from "@/content/atlas/public";
import { openSourceProjects } from "@/lib/content";

const launchStatuses = [
  ["Route inventory", "pass", "English canonical routes are explicit; internal and incomplete locale routes are excluded from the public sitemap."],
  ["Route health", "pass", "Canonical public routes, 404 behaviour and emergency access pass the local browser matrix."],
  ["Redirect health", "pass", "Systems, company and project-entry legacy redirects resolve to their canonical routes."],
  ["Metadata health", "pass", "Canonical, title, description, Open Graph and Twitter summary metadata render without misleading hreflang."],
  ["Accessibility", "pass", "Axe reports no critical or serious findings; manual assistive-technology approval remains pending."],
  ["Performance", "pass", "Desktop 95/100/96/100; mobile median 94/100/96/100. Repeat behind the staging proxy."],
  ["Link status", "pass", "Five public repositories and KU Journals returned HTTP 200 on 2026-07-15; production monitoring remains separate."],
  ["Image review", "requires owner decision", "Sixteen candidate families are technically reviewable; none is owner-approved."],
  ["Cultural review", "requires cultural review", "All seven state systems require accountable cultural/geographic review."],
  ["Content review", "requires owner decision", "Evidence boundaries are recorded; final owner approval is absent."],
  ["Legal status", "requires legal review", "Entity, controller, jurisdiction, retention and service terms remain unresolved."],
  ["Integration status", "blocked", "No production CRM, calendar, chat, uploads, analytics, consent or status provider is approved."],
  ["Translation status", "blocked", "French and Portuguese critical journeys are incomplete and noindexed."],
  ["Owner approval", "requires owner decision", "No W9 control persists or implies an owner decision."],
  ["Launch blockers", "blocked", "Owner, cultural, rights, legal, localisation, integration and staging gates remain open."],
] as const;

const integrationRows = [
  ["CRM", "Unavailable; API returns 503", "Choose CRM and field ownership", "Endpoint and server credential", "Notice, lawful basis, retention", "Server-only secret, validation, rate limit", "Provider and data contract", "Blocks online submission"],
  ["Email", "User-initiated mailto fallback", "Approve mailbox and handoff", "None for mailto; provider keys if automated", "Recipient, retention, sensitive-data warning", "No public relay; DMARC/SPF/DKIM ownership", "Legal and operating owner", "Fallback works; automation blocked"],
  ["Chatwoot", "Not connected", "Approve whether chat is needed", "Server/widget configuration", "Processor, transcript retention, consent", "Origin restriction, identity and redaction", "Provider and privacy approval", "Optional capability blocked"],
  ["Calendar", "No slots or booking confirmation", "Choose provider or retain email", "Server/OAuth credential", "Booking fields, processor, retention", "No client secret; verified webhook/state", "Provider and failure ownership", "Blocks live booking"],
  ["Uploads", "Not available", "Approve file need and limits", "Object-store/server credentials", "Purpose, retention, deletion, sensitive files", "Malware scan, type/size limits, isolation", "Storage and security design", "Blocks attachments"],
  ["Analytics", "No tracker loaded", "Approve provider and measurement plan", "Site/project identifier", "Purpose, minimisation, retention, opt-out", "No sensitive values; staging exclusion", "Legal and owner approval", "Measurement unavailable"],
  ["Consent", "No banner or simulated consent", "Approve regional consent model", "Provider config if selected", "Categories, withdrawal, DNT/GPC", "Consent-before-load and integrity", "Legal decision", "Blocks non-essential tracking"],
  ["Status", "No live service feed", "Approve components and incident owner", "Read-only status API if selected", "Incident-data publication boundary", "Authenticated writes; cache/failure state", "Verified monitoring source", "Live status unavailable"],
  ["Spam controls", "Local-only form; no submission", "Choose controls with endpoint", "Server keys if CAPTCHA/rate service", "Minimise identifiers and retention", "Origin, rate, size, honeypot, abuse logs", "Depends on submission design", "Blocks safe public endpoint"],
] as const;

export default function W9LaunchPage() {
  const routeInventory = ["/", ...publicPages.map((page) => `/${page.path}`), "/publishing/pricing", "/work/ku-journals", ...openSourceProjects.map((item) => `/open-source/${item.slug}`)];
  return <W9ReviewShell eyebrow="LAUNCH DECISION" title="Not ready." intro="W9 establishes a merge-review baseline, but it cannot authorise staging or production while owner, cultural, rights, legal, localisation and integration decisions remain open.">
    <section className={styles.section}><h2>Explicit launch status</h2><table className={styles.register} tabIndex={0}><thead><tr><th>Area</th><th>Status</th><th>Evidence boundary</th></tr></thead><tbody>{launchStatuses.map(([area, status, evidence]) => <tr key={area}><td>{area}</td><td><strong className={status === "blocked" ? styles.blocker : ""}>{status}</strong></td><td>{evidence}</td></tr>)}</tbody></table></section>
    <section className={styles.section}><h2>Canonical route inventory</h2><p>{routeInventory.join(" · ")}</p></section>
    <section className={styles.section}><h2>Integration decision matrix</h2><table className={styles.register} tabIndex={0}><thead><tr><th>Capability</th><th>Current state</th><th>Owner decision</th><th>Credentials</th><th>Privacy</th><th>Security</th><th>Blocker</th><th>Launch impact</th></tr></thead><tbody>{integrationRows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></section>
  </W9ReviewShell>;
}
