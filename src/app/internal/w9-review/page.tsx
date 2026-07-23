import Link from "next/link";
import { W9ReviewShell, w9Styles as styles } from "@/components/atlas-w9/W9ReviewShell";
import { w9Artwork, w9PageFamilies } from "@/content/atlas/w9-review";

export default function W9ReviewOverview() {
  const states = new Set(w9Artwork.map((asset) => asset.state)).size;
  return <W9ReviewShell eyebrow="FINAL REVIEW REGISTER" title="Launch readiness, without theatre." intro="A private, offline-capable workspace for inspecting every active Atlas artwork family, public page family, claim boundary and launch dependency. Nothing here constitutes approval.">
    <section className={styles.section}><h2>Review position</h2><p>The public Atlas is technically coherent, but it is not launch-ready while artwork, legal identity, production integrations and critical localisation remain unapproved.</p><div className={styles.metricGrid}><article><strong>{w9Artwork.length}</strong><span>ACTIVE ARTWORK FAMILIES</span></article><article><strong>{states}</strong><span>STATE SYSTEMS</span></article><article><strong>{w9PageFamilies.length}</strong><span>PAGE FAMILIES</span></article><article><strong>0</strong><span>ARTWORKS MARKED APPROVED</span></article></div></section>
    <section className={styles.section}><h2>Five review surfaces</h2><table className={styles.register} tabIndex={0}><thead><tr><th>Surface</th><th>Purpose</th><th>Open</th></tr></thead><tbody>
      <tr><td>Artwork</td><td>Desktop/mobile sheets, safe zones, focal points, anchors, sources and nonpersistent review controls.</td><td><Link href="/internal/w9-review/artwork">Review artwork</Link></td></tr>
      <tr><td>Pages</td><td>Public route families, state assignments, responsive evidence and functional boundaries.</td><td><Link href="/internal/w9-review/pages">Review pages</Link></td></tr>
      <tr><td>Content</td><td>Claims, publishing evidence, pricing, plugins, project proof, legal and localisation boundaries.</td><td><Link href="/internal/w9-review/content">Review content</Link></td></tr>
      <tr><td>Launch</td><td>Blockers, integration decisions, technical gates, rollback and the W9 classification.</td><td><Link href="/internal/w9-review/launch">Review launch</Link></td></tr>
    </tbody></table></section>
  </W9ReviewShell>;
}
