import type { ReactNode } from "react";
import type { AtlasSafeZone } from "@/lib/atlas/types";
import styles from "./atlas-scene.module.css";

export function SceneCaption({ zone, eyebrow, children }: { zone: AtlasSafeZone; eyebrow?: string; children: ReactNode }) {
  return (
    <div className={styles.caption} data-safe-zone={zone}>
      {eyebrow ? <span>{eyebrow}</span> : null}
      <div>{children}</div>
    </div>
  );
}
