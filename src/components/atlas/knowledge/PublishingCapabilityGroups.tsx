import { knowledgeServicePathways } from "@/content/atlas/knowledge";
import { ServicePathway } from "@/components/atlas/services";
import styles from "./atlas-knowledge.module.css";

export function PublishingCapabilityGroups() {
  return (
    <section className={styles.capabilities} id="publishing-capabilities" aria-labelledby="capabilities-title" tabIndex={-1}>
      <header><span>Publishing capability folios</span><h2 id="capabilities-title">The platform lifecycle, kept in one inspectable record.</h2><p>These are repository-recorded areas Airix may implement or support. They are not a universal journal workflow, package, partnership, certification, or outcome promise.</p></header>
      <nav className={styles.capabilityIndex} aria-label="Publishing capability groups">
        {knowledgeServicePathways.map((pathway) => <a href={`#${pathway.id}`} key={pathway.id}><span>{pathway.index}</span>{pathway.name}</a>)}
      </nav>
      <div className={styles.capabilityFolios}>{knowledgeServicePathways.map((pathway) => <ServicePathway pathway={pathway} variant="knowledge" key={pathway.id} />)}</div>
    </section>
  );
}
