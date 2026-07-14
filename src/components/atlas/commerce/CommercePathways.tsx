import { commerceServicePathways } from "@/content/atlas/commerce";
import { ServicePathway } from "@/components/atlas/services";
import styles from "./atlas-commerce.module.css";

export function CommercePathways() {
  return (
    <section className={styles.pathways} id="commerce-pathways" aria-labelledby="pathways-title" tabIndex={-1}>
      <header className={styles.pathwaysHeading}>
        <div><span>Commerce District · service routes</span><h2 id="pathways-title">Four pathways through one connected field.</h2></div>
        <p>Each route names its scope, the needs it may address, the work Airix may undertake, and the evidence status of that wording.</p>
      </header>
      <nav className={styles.pathwayDirectory} aria-label="Commerce service pathways">
        {commerceServicePathways.map((pathway) => <a href={`#${pathway.id}`} key={pathway.id}><span>{pathway.index}</span>{pathway.name}</a>)}
      </nav>
      <div className={styles.pathwayList}>{commerceServicePathways.map((pathway) => <ServicePathway pathway={pathway} key={pathway.id} />)}</div>
    </section>
  );
}
