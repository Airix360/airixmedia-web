import { W9ReviewShell, w9Styles as styles } from "@/components/atlas-w9/W9ReviewShell";

const claims = [
  ["Airix positioning", "Owner-supplied", "Boutique creative technology studio and digital operations partner; Airix 360 relationship is brand-level only."],
  ["KU Journals", "Publicly verifiable", "Dated source captures support the live interface and visible Airix Media footer credit only."],
  ["OJS pricing", "Owner-confirmed / time-sensitive", "NGN starting prices are centralised; proposal and billing country remain authoritative."],
  ["Five OJS plugins", "Publicly verifiable", "Public repository identity, purpose and point-in-time release state; no adoption, partnership or outcome claim."],
  ["PaystackOJS version", "Conflicting public evidence", "GitHub release v1.1.1.0 and README header 1.1.0 are both disclosed."],
  ["Portal", "Verified scope only", "Projects, approvals and billing. No broader capability is claimed."],
  ["Service outcomes", "Qualified capability", "Build, Run and Rescue describe service scope, not guaranteed outcomes, uptime or response times."],
  ["Legal identity", "Do not publish as final", "Entity, suffix, jurisdiction, controller, address, retention and governing terms await legal approval."],
] as const;

export default function W9ContentPage() {
  return <W9ReviewShell eyebrow="CLAIM REGISTER" title="Say only what the record supports." intro="Every important claim is assigned an evidence class. Missing proof remains visible as a launch dependency rather than being converted into confident marketing copy.">
    <section className={styles.section}><h2>Claims and evidence</h2><table className={styles.register}><thead><tr><th>Subject</th><th>Classification</th><th>Permitted boundary</th></tr></thead><tbody>{claims.map(([subject, classification, boundary]) => <tr key={subject}><td>{subject}</td><td>{classification}</td><td>{boundary}</td></tr>)}</tbody></table></section>
    <section className={styles.section}><h2>Publication safeguards</h2><p>Production filters exclude inferred-needs-review, placeholder and do-not-publish content. Candidate artwork is never described as approved or documentary. French and Portuguese routes remain noindexed until each critical journey is complete and reviewed. Downloadable resources remain unavailable until real files, ownership, accessibility and versioning are verified.</p></section>
  </W9ReviewShell>;
}
