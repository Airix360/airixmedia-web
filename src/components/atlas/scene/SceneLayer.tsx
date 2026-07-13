/* eslint-disable @next/next/no-img-element -- transparent layers need direct stacking without optimiser wrappers */
import type { CSSProperties } from "react";
import type { AtlasSceneLayerAsset } from "@/lib/atlas/types";
import styles from "./atlas-scene.module.css";

interface SceneLayerProps {
  layer: AtlasSceneLayerAsset;
  motion?: "none" | "drift" | "route";
  priority?: boolean;
}

export function SceneLayer({ layer, motion = "none", priority = false }: SceneLayerProps) {
  const style = { "--atlas-layer-depth": layer.depth } as CSSProperties;
  return (
    // Transparent scene layers must remain raw images so the browser can stack them without an optimiser wrapper.
    <img
      className={styles.layer}
      src={layer.src}
      alt=""
      aria-hidden="true"
      data-layer-role={layer.role}
      data-layer-motion={motion}
      loading={priority || layer.depth <= 1 ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={style}
    />
  );
}
