import Link from "next/link";
import { atlasDistrictNames, atlasPrimaryNavigation, atlasUtilityNavigation } from "@/content/atlas/navigation";
import type { AtlasDistrictId } from "@/lib/atlas/types";
import { AtlasRouteIndicator } from "./AtlasRouteIndicator";
import { MobileNavigation } from "./MobileNavigation";
import { PortalAccess } from "./PortalAccess";
import styles from "./atlas-navigation.module.css";

export function PrimaryNavigation({ activeDistrict = "arrival" }: { activeDistrict?: AtlasDistrictId }) {
  return (
    <header className={styles.primaryHeader} data-active-district={activeDistrict}>
      <div className={styles.utilityBar}>
        <span>Airix Media · Lagos</span>
        <div><Link href={atlasUtilityNavigation[0].href}>Emergency Support</Link><PortalAccess compact /></div>
      </div>
      <div className={styles.primaryRow}>
        <Link className={styles.atlasBrand} href="/" aria-label="Airix Media home"><span aria-hidden="true">A</span><strong>AIRIX MEDIA</strong></Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {atlasPrimaryNavigation.map((item) => <Link key={item.label} href={item.href} data-priority={item.priority} aria-current={item.district === activeDistrict ? "page" : undefined}><span>{item.label}</span><small>{atlasDistrictNames[item.district]}</small></Link>)}
        </nav>
        <MobileNavigation activeDistrict={activeDistrict} />
      </div>
      <AtlasRouteIndicator activeDistrict={activeDistrict} />
    </header>
  );
}
