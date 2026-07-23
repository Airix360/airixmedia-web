import { knowledgeEvidenceMedia, paystackOjsProject } from "@/content/atlas/knowledge";
import { ProjectMediaSequence } from "@/components/atlas/proof";
import { OpenSourceProject } from "./OpenSourceProject";
import styles from "./atlas-knowledge.module.css";

export function OpenSourceWorkshop() {
  return (
    <section className={styles.workshop} id="open-source-workshop" aria-labelledby="workshop-title">
      <header><span>Open-source workshop</span><h2 id="workshop-title">Public code beside inspectable publishing evidence.</h2><p>Repository facts remain separate from client proof. One shows a public tool; the other shows only the current interface and responsibility credit that were source-captured for KU Journals.</p></header>
      <div className={styles.workshopGrid}>
        <OpenSourceProject project={paystackOjsProject} />
        <aside className={styles.evidenceFolio} aria-labelledby="evidence-folio-title"><span>Publishing evidence folio</span><h3 id="evidence-folio-title">KU Journals · source captures</h3><ProjectMediaSequence projectName="KU Journals" media={knowledgeEvidenceMedia} /></aside>
      </div>
    </section>
  );
}
