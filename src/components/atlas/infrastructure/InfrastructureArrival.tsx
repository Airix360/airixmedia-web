import Link from "next/link";
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { AtlasScene, DistrictMarker } from "@/components/atlas/scene";
import styles from "./atlas-infrastructure.module.css";

export function InfrastructureArrival({ scene, marker }: { scene: AtlasSceneAsset; marker: AtlasLibraryAsset }) {
  return <section className={styles.arrival} id="infrastructure-arrival" aria-labelledby="infrastructure-title">
    <AtlasScene className={styles.arrivalScene} scene={scene} mode="static" priority />
    <div className={styles.arrivalStatus}>Candidate district art · internal review</div>
    <div className={styles.arrivalSignal}>
      <DistrictMarker district="infrastructure" label="Managed Infrastructure" icon={marker.src} />
      <span>Proposed internal copy</span>
      <h1 id="infrastructure-title">Everything working beneath the surface.</h1>
      <p>Hosting, routes, data, monitoring, recovery, integrations, and support—made visible.</p>
      <div><a href="#infrastructure-capabilities">Inspect the operating layers ↓</a><Link href="/support/emergency">Emergency Support ↗</Link></div>
    </div>
  </section>;
}
