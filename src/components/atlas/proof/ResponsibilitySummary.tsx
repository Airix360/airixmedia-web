import styles from "./atlas-proof.module.css";

export function ResponsibilitySummary({ need, responsibility, exclusions, headingId }: { need: readonly string[]; responsibility: readonly string[]; exclusions: readonly string[]; headingId: string }) {
  const groups = [
    ["Need", need],
    ["Airix responsibility", responsibility],
    ["Not attributed to Airix", exclusions],
  ] as const;
  return (
    <section className={styles.responsibility} aria-labelledby={headingId}>
      <h3 id={headingId}>Responsibility before capability.</h3>
      <div>
        {groups.map(([title, items], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h4>{title}</h4>{items.map((item) => <p key={item}>{item}</p>)}</article>)}
      </div>
    </section>
  );
}
