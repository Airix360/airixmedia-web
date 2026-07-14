import Link from "next/link";
import type { AtlasLibraryAsset } from "@/lib/atlas/types";
import { AtlasSignal, DistrictMarker } from "@/components/atlas/scene";
import styles from "./atlas-arrival.module.css";

export function SystemsTransition({ marker }: { marker: AtlasLibraryAsset }) {
  return (
    <div className={styles.systemsTransition} aria-label="First route beyond Arrival">
      <div className={styles.transitionRoute} aria-hidden="true"><AtlasSignal decorative /><i /><i /><i /></div>
      <DistrictMarker district="arrival" label="Arrival" icon={marker.src} />
      <div className={styles.transitionActions}>
        <Link href="/services">Explore the system</Link>
        <Link href="/atlas">Continue into Atlas</Link>
        <Link href="/start-a-project">Discuss a Project</Link>
      </div>
    </div>
  );
}
