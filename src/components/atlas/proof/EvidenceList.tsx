import type { ProjectEvidence } from "@/content/atlas/landmarks";
import styles from "./atlas-proof.module.css";

const statusLabels = { verified: "Verified", source_capture: "Source captured", placeholder: "Missing / review" } as const;

export function EvidenceList({ items, headingId }: { items: readonly ProjectEvidence[]; headingId: string }) {
  return (
    <section className={styles.evidenceList} aria-labelledby={headingId}>
      <header><span>Evidence register</span><h3 id={headingId}>What can be inspected.</h3></header>
      <ol>
        {items.map((item, index) => (
          <li key={`${item.type}-${index}`} data-evidence-status={item.status}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><small>{item.type}</small><p>{item.label}</p><em>{statusLabels[item.status]} · {item.source}</em></div>
            {item.href ? <a href={item.href} target="_blank" rel="noreferrer">Inspect source<span className="sr-only"> for {item.label}</span> ↗</a> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
