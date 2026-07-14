import type { ReactNode } from "react";
import styles from "./atlas-proof.module.css";

export function LandmarkReveal({ id, variant, labelledBy, children }: { id: string; variant: "technology" | "publishing"; labelledBy: string; children: ReactNode }) {
  return (
    <section id={id} className={styles.landmarkReveal} data-proof-pattern={variant} aria-labelledby={labelledBy}>
      <div className={styles.threshold} aria-hidden="true"><i /><span>{variant === "technology" ? "ROUTE ARRIVAL" : "ARCHIVE OPEN"}</span><i /></div>
      {children}
    </section>
  );
}
