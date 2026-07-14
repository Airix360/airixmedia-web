import { continuityStates } from "@/content/atlas/infrastructure";
import styles from "./atlas-infrastructure.module.css";

export function ServiceLevelSummary() {
  return <section className={styles.serviceLevels} aria-labelledby="service-level-title" data-service-level-summary>
    <header><span>Service-level summary</span><h3 id="service-level-title">Categories are visible. Commitments are scoped.</h3></header>
    <ol>{continuityStates.map((state, index) => <li key={state.name}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{state.name}</strong><p>{state.detail}</p><small>{state.terms}</small></div></li>)}</ol>
  </section>;
}
