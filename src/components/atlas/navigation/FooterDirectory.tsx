import Link from "next/link";
import { atlasDistrictNames, atlasPrimaryNavigation, atlasUtilityNavigation } from "@/content/atlas/navigation";
import styles from "./atlas-navigation.module.css";

export function FooterDirectory() {
  return (
    <footer className={styles.footerDirectory}>
      <div className={styles.footerStatement}><strong>AIRIX MEDIA</strong><p>Invisible systems. Visible progress.</p><span>Atlas Runtime 1 · W0 review foundation</span></div>
      <nav aria-label="Atlas directory">{atlasPrimaryNavigation.map((item) => <Link key={item.label} href={item.href}><span>{item.label}</span><small>{atlasDistrictNames[item.district]}</small></Link>)}</nav>
      <div className={styles.footerUtility}><Link href={atlasUtilityNavigation[0].href}>Emergency Support</Link><a href={atlasUtilityNavigation[1].href}>Client Portal</a><Link href={atlasUtilityNavigation[2].href}>Contact</Link></div>
    </footer>
  );
}
