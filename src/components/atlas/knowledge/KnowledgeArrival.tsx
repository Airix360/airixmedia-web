import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { AtlasScene, DistrictMarker } from "@/components/atlas/scene";
import styles from "./atlas-knowledge.module.css";

export function KnowledgeArrival({ scene, marker }: { scene: AtlasSceneAsset; marker: AtlasLibraryAsset }) {
  return (
    <section className={styles.arrival} id="knowledge-arrival" aria-labelledby="knowledge-title">
      <AtlasScene className={styles.arrivalScene} scene={scene} mode="static" priority />
      <div className={styles.arrivalStatus}>Candidate district art · internal review</div>
      <div className={styles.arrivalFolio}>
        <DistrictMarker district="knowledge" label="Publishing" icon={marker.src} />
        <span>Proposed internal copy</span>
        <h1 id="knowledge-title">Publishing is not a page.</h1>
        <p>It is a system of people, decisions, records, and trust.</p>
        <a href="#publishing-capabilities">Read the publishing record <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
