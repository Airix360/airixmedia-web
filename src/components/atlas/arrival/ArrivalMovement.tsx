/* eslint-disable @next/next/no-img-element -- authored Atlas route material needs direct transparent composition */
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { ResponsivePicture } from "@/components/atlas/scene";
import styles from "./atlas-arrival.module.css";

export function ArrivalMovement({ scene, route }: { scene: AtlasSceneAsset; route: AtlasLibraryAsset }) {
  return (
    <section id="arrival-movement" className={styles.movement} data-arrival-step="movement" data-rhythm="lagos-energy" aria-labelledby="arrival-movement-title">
      <div className={styles.movementHeader}>
        <span>Morning route · 02</span>
        <h2 id="arrival-movement-title">The city wakes.</h2>
      </div>
      <figure className={styles.movementWorld} aria-describedby="arrival-movement-description">
        <ResponsivePicture className={styles.movementPicture} sources={scene.responsive} objectPosition={scene.focalPoints} alt="" decorative />
        <img className={styles.movementRoute} src={route.src} alt="" aria-hidden="true" />
        <div className={styles.movementTrace} aria-hidden="true"><i /><i /><i /></div>
        <figcaption id="arrival-movement-description" className="sr-only">Bridge, lagoon, ferry, road traffic and people moving through Lagos make connection and dependable handoff visible.</figcaption>
      </figure>
      <p className={styles.movementNote}>Bridge. Lagoon. Transit. People and ideas in motion.</p>
    </section>
  );
}
