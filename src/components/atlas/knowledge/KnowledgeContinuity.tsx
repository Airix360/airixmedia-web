import { knowledgeContinuity, knowledgeContinuityEvidence } from "@/content/atlas/knowledge";
import { CaseStudyLink, EvidenceList, ResponsibilitySummary } from "@/components/atlas/proof";
import styles from "./atlas-knowledge.module.css";

export function KnowledgeContinuity() {
  return (
    <section className={styles.continuity} aria-labelledby="knowledge-continuity-title">
      <header><span>Continuity and support · scoped responsibility</span><h2 id="knowledge-continuity-title">The record continues after publication.</h2><p>A journal platform needs ongoing care, but exact ownership and terms belong to an agreed proposal or contract.</p></header>
      <div className={styles.continuityGrid}>
        <ResponsibilitySummary headingId="knowledge-responsibility" need={knowledgeContinuity.need} responsibility={knowledgeContinuity.responsibility} exclusions={knowledgeContinuity.exclusions} />
        <EvidenceList headingId="knowledge-evidence" items={knowledgeContinuityEvidence} />
      </div>
      <nav className={styles.relatedRoutes} aria-label="Knowledge related routes">
        <CaseStudyLink href="/systems" label="Work" district="Landmarks" />
        <CaseStudyLink href="/services" label="Services" district="Commerce District" />
        <CaseStudyLink href="/services/managed-infrastructure" label="Infrastructure" district="Infrastructure District" />
        <CaseStudyLink href="/atlas" label="Atlas" district="Observatory" />
        <CaseStudyLink href="/start-a-project" label="Discuss a Publishing Project" district="Gateway District" />
      </nav>
    </section>
  );
}
