import { publishingWorkflow } from "@/content/atlas/knowledge";
import { PublishingWorkflow } from "./PublishingWorkflow";
import styles from "./atlas-knowledge.module.css";

export function EditorialCourtyard() {
  return (
    <section className={styles.courtyard} id="publishing-workflow" aria-labelledby="workflow-title">
      <header><span>Editorial courtyard · configurable model</span><h2 id="workflow-title">A manuscript moves because people make and record decisions.</h2><p>This illustrative sequence names common publishing stages. Each journal configures its own roles, policies, decisions, and exact route.</p></header>
      <PublishingWorkflow stages={publishingWorkflow} />
    </section>
  );
}
