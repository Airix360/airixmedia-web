import styles from "./atlas-services.module.css";

export function CapabilityGroup({ label, title, items }: { label: string; title: string; items: readonly string[] }) {
  return (
    <section className={styles.capabilityGroup} aria-label={`${title}: ${label}`}>
      <span>{label}</span>
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
