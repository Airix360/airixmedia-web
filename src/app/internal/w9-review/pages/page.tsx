import Link from "next/link";
import { W9ReviewShell, w9Styles as styles } from "@/components/atlas-w9/W9ReviewShell";
import { w9PageFamilies } from "@/content/atlas/w9-review";

export default function W9PagesPage() {
  return <W9ReviewShell eyebrow="PUBLIC PAGE AUDIT" title="The system, route by route." intro="Page families are reviewed at 1440, 1280, 1024, 768, 390 and 360 CSS pixels, plus zoom, reduced motion and both themes. Links open the public route in the same local build.">
    <section className={styles.section}><h2>Public families</h2><table className={styles.register} tabIndex={0}><thead><tr><th>Family</th><th>Representative route</th><th>State</th><th>Review focus</th></tr></thead><tbody>{w9PageFamilies.map(([family, route, state, focus]) => <tr key={family}><td>{family}</td><td><Link href={route}>{route}</Link></td><td>{state}</td><td>{focus}</td></tr>)}</tbody></table></section>
    <section className={styles.section}><h2>Responsive acceptance matrix</h2><table className={styles.register} tabIndex={0}><thead><tr><th>Mode</th><th>Required evidence</th><th>Pass condition</th></tr></thead><tbody><tr><td>Wide desktop</td><td>1440×1000 and 1280×900</td><td>No clipping, collision, accidental crop or unreadable overlay.</td></tr><tr><td>Tablet</td><td>1024×768 and 768×1024</td><td>Navigation, art direction and reading order remain coherent.</td></tr><tr><td>Mobile</td><td>390×844 and 360×800</td><td>Compact derivatives load; forms, menu and actions remain operable.</td></tr><tr><td>Adaptation</td><td>200% zoom, reduced motion, light/dark</td><td>No lost content or control; motion has a static equivalent.</td></tr></tbody></table></section>
  </W9ReviewShell>;
}
