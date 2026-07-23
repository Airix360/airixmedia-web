import { infrastructureEvidence, infrastructureResponsibility } from "@/content/atlas/infrastructure";
import { CaseStudyLink, EvidenceList, ResponsibilitySummary } from "@/components/atlas/proof";
import { EmergencySupportCTA } from "./EmergencySupportCTA";
import styles from "./atlas-infrastructure.module.css";

export function InfrastructureResponsibility() {
  return <section className={styles.responsibility} aria-labelledby="responsibility-title">
    <header><span>Responsibility and support</span><h2 id="responsibility-title">Ownership has boundaries—and a route when systems fail.</h2><p>Airix may coordinate an operating scope without claiming control over third-party providers or promising uninterrupted service.</p></header>
    <div className={styles.responsibilityGrid}><ResponsibilitySummary headingId="infrastructure-responsibility" need={infrastructureResponsibility.need} responsibility={infrastructureResponsibility.responsibility} exclusions={infrastructureResponsibility.exclusions} /><EvidenceList headingId="infrastructure-evidence" items={infrastructureEvidence} /></div>
    <EmergencySupportCTA />
    <nav className={styles.relatedRoutes} aria-label="Infrastructure related routes">
      <CaseStudyLink href="/systems" label="Work" district="Landmarks" />
      <CaseStudyLink href="/services" label="Services" district="Commerce District" />
      <CaseStudyLink href="/support" label="Support" district="Infrastructure District" />
      <CaseStudyLink href="/security" label="Security" district="Infrastructure District" />
      <CaseStudyLink href="/start-a-project" label="Discuss a Project" district="Gateway District" />
    </nav>
  </section>;
}
