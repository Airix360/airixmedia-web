import type { ReactNode } from "react";
import type { AtlasSceneMode } from "@/lib/atlas/types";
import styles from "./atlas-scene.module.css";

export function ReducedMotionScene({
  mode,
  motion,
  fallback,
}: {
  mode: AtlasSceneMode;
  motion: ReactNode;
  fallback: ReactNode;
}) {
  return (
    <div className={styles.motionSwitch} data-scene-mode={mode}>
      <div className={styles.motionComposition}>{motion}</div>
      <div className={styles.reducedComposition}>{fallback}</div>
    </div>
  );
}
