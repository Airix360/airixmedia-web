import { integrationTransit } from "@/content/atlas/infrastructure";
import styles from "./atlas-infrastructure.module.css";

export function IntegrationTransit() {
  return <section className={styles.integrations} id="integration-transit" aria-labelledby="integration-title">
    <header><span>Integration transit</span><h2 id="integration-title">Information reaches the next responsible place.</h2><p>Automation is a dependable handoff between systems and people—not an autonomous decision-maker.</p></header>
    <ol data-integration-textual-equivalent>{integrationTransit.map((stop, index) => <li key={stop.name}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{stop.name}</h3><p>{stop.handoff}</p></div></li>)}</ol>
    <p><strong>Textual equivalent:</strong> a visible experience passes an agreed action to its platform and data record; defined payment, email, or external services complete their role; the operational owner receives the next action; support retains responsibility for agreed failure and improvement routes.</p>
  </section>;
}
