import { commerceContinuity, commerceContinuityEvidence } from "@/content/atlas/commerce";
import { CaseStudyLink, EvidenceList, ResponsibilitySummary } from "@/components/atlas/proof";
import styles from "./atlas-commerce.module.css";

export function CommerceContinuity() {
  return (
    <section className={styles.continuity} aria-labelledby="continuity-title">
      <header>
        <span>Responsibility and continuity · proposed internal copy</span>
        <h2 id="continuity-title">Launch is a handoff, not an exit.</h2>
        <p>Exact commercial terms remain outside this review slice. The structural principle is continued, named responsibility where it is agreed.</p>
      </header>
      <div className={styles.continuityGrid}>
        <ResponsibilitySummary headingId="commerce-responsibility" need={commerceContinuity.need} responsibility={commerceContinuity.responsibility} exclusions={commerceContinuity.exclusions} />
        <EvidenceList headingId="commerce-evidence" items={commerceContinuityEvidence} />
      </div>
      <nav className={styles.relatedRoutes} aria-label="Commerce related routes">
        <CaseStudyLink href="/systems" label="Work" district="Landmarks" />
        <CaseStudyLink href="/services/managed-infrastructure" label="Infrastructure" district="Infrastructure District" />
        <CaseStudyLink href="/publishing" label="Publishing" district="Knowledge District" />
        <CaseStudyLink href="/start-a-project" label="Discuss a Project" district="Gateway District" />
      </nav>
    </section>
  );
}
