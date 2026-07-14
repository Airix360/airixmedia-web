import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { AtlasScene, DistrictMarker } from "@/components/atlas/scene";
import styles from "./atlas-commerce.module.css";

export function CommerceArrival({ scene, marker }: { scene: AtlasSceneAsset; marker: AtlasLibraryAsset }) {
  return (
    <section className={styles.arrival} id="commerce-arrival" aria-labelledby="commerce-title">
      <AtlasScene className={styles.arrivalScene} scene={scene} mode="static" priority />
      <div className={styles.arrivalStatus}>Candidate district art · internal review</div>
      <div className={styles.arrivalIdentity}>
        <DistrictMarker district="commerce" label="Services" icon={marker.src} />
        <span>Proposed internal copy</span>
        <h1 id="commerce-title">Every exchange depends on the systems beneath it.</h1>
        <p>Websites, commerce, portals, payments, integrations, and operating tools—made explicit before the metaphor.</p>
        <a href="#commerce-pathways">Enter the service pathways <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
