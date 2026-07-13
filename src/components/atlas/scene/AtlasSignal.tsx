import styles from "./atlas-scene.module.css";

export function AtlasSignal({ decorative = false, label = "Atlas Signal" }: { decorative?: boolean; label?: string }) {
  return (
    <span
      className={styles.signal}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      data-atlas-signal
    ><i /></span>
  );
}
