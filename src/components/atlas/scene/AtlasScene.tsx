import type { ReactNode } from "react";
import type { AtlasSceneAsset, AtlasSceneMode, AtlasSafeZone } from "@/lib/atlas/types";
import { AtlasSignal } from "./AtlasSignal";
import { ReducedMotionScene } from "./ReducedMotionScene";
import { SceneFallback } from "./SceneFallback";
import { SceneLayer } from "./SceneLayer";
import styles from "./atlas-scene.module.css";

interface AtlasSceneProps {
  scene: AtlasSceneAsset;
  mode?: AtlasSceneMode;
  priority?: boolean;
  caption?: ReactNode;
  captionZone?: AtlasSafeZone;
  showSignal?: boolean;
  className?: string;
}

export function AtlasScene({
  scene,
  mode = "static",
  priority = false,
  caption,
  captionZone,
  showSignal = false,
  className,
}: AtlasSceneProps) {
  const safeZone = captionZone ?? scene.desktopSafeZone;
  const fallback = <SceneFallback sources={scene.responsive} alt={scene.alt} priority={priority} objectPosition={scene.focalPoint} />;
  const layered = (
    <div className={styles.layers} role="img" aria-label={scene.alt}>
      {scene.layers.map((layer) => (
        <SceneLayer
          key={layer.id}
          layer={layer}
          priority={priority}
          motion={layer.role === "atmosphere" ? "drift" : layer.role === "surface" ? "route" : "none"}
        />
      ))}
    </div>
  );

  return (
    <figure
      className={`${styles.scene}${className ? ` ${className}` : ""}`}
      data-atlas-scene={scene.id}
      data-district={scene.district}
      data-asset-status={scene.status}
      data-mobile-safe-zone={scene.mobileSafeZone}
    >
      <ReducedMotionScene mode={mode} motion={layered} fallback={fallback} />
      {showSignal ? <div className={styles.signalPosition}><AtlasSignal decorative /></div> : null}
      {caption ? <figcaption className={styles.sceneCaption} data-safe-zone={safeZone}>{caption}</figcaption> : null}
    </figure>
  );
}
