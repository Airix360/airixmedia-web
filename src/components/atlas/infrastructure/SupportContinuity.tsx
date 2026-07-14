import { ServiceLevelSummary } from "./ServiceLevelSummary";
import styles from "./atlas-infrastructure.module.css";

export function SupportContinuity() {
  return <section className={styles.continuity} id="monitoring-continuity" aria-labelledby="continuity-title">
    <header><span>Monitoring window · structural model</span><h2 id="continuity-title">Condition must be visible before responsibility can be useful.</h2><p>No live monitoring is connected to this prototype. Exact signals, intervals, backup terms, response commitments, and escalation paths belong to the scoped service.</p></header>
    <div className={styles.monitorWindow} aria-hidden="true"><span>OPERATING WINDOW</span><i /><strong>Observe<br />Maintain<br />Recover</strong></div>
    <ServiceLevelSummary />
  </section>;
}
