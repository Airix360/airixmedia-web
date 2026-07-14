import { connectedCommerceSystem } from "@/content/atlas/commerce";
import styles from "./atlas-commerce.module.css";

export function ConnectedCommerceSystem() {
  return (
    <section className={styles.connectedSystem} id="connected-commerce-system" aria-labelledby="connected-title">
      <header>
        <span>Connected system view</span>
        <h2 id="connected-title">The exchange is only complete when the next responsibility is clear.</h2>
        <p>One illustrative relationship model. The actual system depends on agreed scope, providers, access, data, and operating roles.</p>
      </header>
      <div className={styles.systemField}>
        <div className={styles.systemLedger} aria-hidden="true"><span>EXCHANGE</span><strong>One action.<br />Seven responsibilities.</strong></div>
        <ol data-connected-system-textual-equivalent>
          {connectedCommerceSystem.map((node, index) => (
            <li key={node.name} data-system-node={index + 1}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{node.name}</h3><p>{node.role}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <p className={styles.systemNote}><strong>Textual equivalent:</strong> a customer action enters an experience, passes through the relevant commerce or portal rules, may connect to payment and external services, creates a data record, reaches an operational owner, and remains within an agreed maintenance scope.</p>
    </section>
  );
}
