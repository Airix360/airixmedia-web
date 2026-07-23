import type { AtlasSceneAsset } from "@/lib/atlas/types";
import { AtlasScene, SceneCaption } from "@/components/atlas/scene";
import styles from "./atlas-arrival.module.css";

export function ArrivalOpening({ scene }: { scene: AtlasSceneAsset }) {
  return (
    <section id="arrival-opening" className={styles.opening} data-arrival-step="wonder" data-rhythm="monumental-calm" aria-labelledby="arrival-opening-line">
      <AtlasScene
        className={styles.openingScene}
        scene={scene}
        mode="static"
        priority
        captionZone={scene.safeZones.desktop}
        caption={(
          <SceneCaption zone={scene.safeZones.desktop} eyebrow="Arrival District · Morning">
            <h1 id="arrival-opening-line">Every thriving city depends on invisible systems.</h1>
          </SceneCaption>
        )}
      />
      <div className={styles.openingIndex} aria-hidden="true"><span>ARRIVAL</span><i /><span>LAGOS · ATLAS 01</span></div>
    </section>
  );
}
