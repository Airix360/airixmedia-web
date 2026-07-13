import { atlasDistrictNames } from "@/content/atlas/navigation";
import type { AtlasDistrictId } from "@/lib/atlas/types";
import styles from "./atlas-navigation.module.css";

const route: readonly AtlasDistrictId[] = ["arrival", "landmarks", "commerce", "knowledge", "infrastructure", "studio", "observatory", "gateway"];

export function AtlasRouteIndicator({ activeDistrict }: { activeDistrict: AtlasDistrictId }) {
  return (
    <ol className={styles.routeIndicator} aria-label={`Current Atlas location: ${atlasDistrictNames[activeDistrict]}`}>
      {route.map((district) => <li key={district} data-active={district === activeDistrict}><span className="sr-only">{atlasDistrictNames[district]}</span></li>)}
    </ol>
  );
}
