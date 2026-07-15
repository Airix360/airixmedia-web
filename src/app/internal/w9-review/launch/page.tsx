import { W9ReviewShell, w9Styles as styles } from "@/components/atlas-w9/W9ReviewShell";
import { w9LaunchChecks } from "@/content/atlas/w9-review";

export default function W9LaunchPage() {
  return <W9ReviewShell eyebrow="LAUNCH DECISION" title="Not ready." intro="W9 can establish a merge-review baseline, but it cannot authorise staging or production while owner, cultural, rights, legal, localisation and integration decisions remain open.">
    <section className={styles.section}><h2>Launch gates</h2>{w9LaunchChecks.map(([gate, status, reason]) => <div className={styles.decision} key={gate}><strong className={status === "Not met" ? styles.blocker : ""}>{status}</strong><div><h2>{gate}</h2><p>{reason}</p></div></div>)}</section>
    <section className={styles.section}><h2>Integration decision matrix</h2><table className={styles.register}><thead><tr><th>Capability</th><th>W9 state</th><th>Launch decision</th></tr></thead><tbody><tr><td>Project/contact forms</td><td>Local summary only; API returns explicit 503.</td><td>Select and secure a production CRM endpoint or retain clearly labelled email handoff.</td></tr><tr><td>Booking</td><td>No calendar or invented availability.</td><td>Approve provider, privacy terms, failure state and handoff.</td></tr><tr><td>Analytics/consent</td><td>No tracker loaded.</td><td>Approve measurement purpose, consent model, retention and disclosure.</td></tr><tr><td>Status/support/chat/uploads</td><td>Unavailable; no simulated success.</td><td>Verify providers, ownership, data flows, security and operational response.</td></tr></tbody></table></section>
  </W9ReviewShell>;
}
