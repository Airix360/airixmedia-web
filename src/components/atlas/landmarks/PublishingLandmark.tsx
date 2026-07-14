import type { CSSProperties } from "react";
import { publishingLandmark } from "@/content/atlas/landmarks";
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { AtlasScene, DistrictMarker } from "@/components/atlas/scene";
import { CaseStudyLink, EvidenceList, LandmarkReveal, ProjectFeature, ProjectMediaSequence, ResponsibilitySummary } from "@/components/atlas/proof";
import styles from "./atlas-landmarks.module.css";

export function PublishingLandmark({ scene, marker, paper }: { scene: AtlasSceneAsset; marker: AtlasLibraryAsset; paper: AtlasLibraryAsset }) {
  const material = { "--archive-paper": `url(${paper.src})` } as CSSProperties;
  return (
    <article id="publishing-landmark" className={styles.publishing} style={material} data-case-pattern="editorial" data-proof-status={publishingLandmark.proofStatus}>
      <div className={styles.publishingOpening}>
        <div className={styles.publishingIdentity}>
          <DistrictMarker district="knowledge" label="Scholarly publishing" icon={marker.src} />
          <ProjectFeature eyebrow="Landmark 02 · source-backed example" name={publishingLandmark.name} relationship={publishingLandmark.relationship} status={publishingLandmark.proofStatus} headingId="publishing-title" />
        </div>
        <AtlasScene className={styles.publishingScene} scene={scene} mode="static" />
      </div>
      <LandmarkReveal id="publishing-evidence" variant="publishing" labelledBy="publishing-title">
        <div className={styles.publishingProof}>
          <header className={styles.archiveHeading}><span>Archive record · KUJ · 2026-07-14</span><strong>Real interface evidence enters the reading room.</strong></header>
          <ProjectMediaSequence projectName={publishingLandmark.name} media={publishingLandmark.media} />
          <div className={styles.publishingRecord}>
            <ResponsibilitySummary headingId="publishing-responsibility" need={publishingLandmark.need} responsibility={publishingLandmark.responsibility} exclusions={publishingLandmark.exclusions} />
            <EvidenceList headingId="publishing-evidence-register" items={publishingLandmark.evidence} />
          </div>
        </div>
        <nav className={styles.relatedRoutes} aria-label="KU Journals related routes">
          <CaseStudyLink href="/publishing" label="Publishing" district="Knowledge District" />
          <CaseStudyLink href="/open-source" label="Open Source" district="Labs District" />
          <CaseStudyLink href="/start-a-project" label="Discuss a Project" district="Gateway District" />
        </nav>
      </LandmarkReveal>
    </article>
  );
}
