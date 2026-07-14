import { publishingSystem } from "@/content/atlas/knowledge";
import styles from "./atlas-knowledge.module.css";

export function PublishingSystemMap() {
  return (
    <section className={styles.system} id="publishing-system" aria-labelledby="system-title">
      <header><span>Platform and metadata system</span><h2 id="system-title">A journal is an archive in motion.</h2><p>This is an illustrative relationship model. Exact configuration depends on the journal, platform, providers, policies, roles, and agreed technical scope.</p></header>
      <div className={styles.systemDesk}>
        <div className={styles.issueAssembly} aria-hidden="true"><span>ISSUE / RECORD</span><strong>Seven connected responsibilities</strong><i /></div>
        <ol data-publishing-system-textual-equivalent>
          {publishingSystem.map((item, index) => <li key={item.name}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.name}</h3><p>{item.role}</p></div></li>)}
        </ol>
      </div>
      <p className={styles.systemEquivalent}><strong>Textual equivalent:</strong> people work with manuscripts through a configured editorial workflow; accepted work becomes a journal and issue record; metadata and agreed external services connect that record to discovery, payment where applicable, communication, and preservation; hosting and ongoing technical care support the platform beneath it.</p>
    </section>
  );
}
