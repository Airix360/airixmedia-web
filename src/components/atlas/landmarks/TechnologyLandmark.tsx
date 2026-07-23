import type { CSSProperties } from "react";
import { technologyLandmark } from "@/content/atlas/landmarks";
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { AtlasScene, DistrictMarker } from "@/components/atlas/scene";
import { CaseStudyLink, EvidenceList, LandmarkReveal, ProjectFeature, ProjectMediaSequence, ResponsibilitySummary } from "@/components/atlas/proof";
import styles from "./atlas-landmarks.module.css";

export function TechnologyLandmark({ scene, marker, route }: { scene: AtlasSceneAsset; marker: AtlasLibraryAsset; route: AtlasLibraryAsset }) {
  const routeStyle = { "--landmark-route": `url(${route.src})` } as CSSProperties;
  return (
    <article id="technology-landmark" className={styles.technology} data-case-pattern="operational" data-proof-status={technologyLandmark.proofStatus}>
      <div className={styles.technologyOpening} style={routeStyle}>
        <AtlasScene className={styles.technologyScene} scene={scene} mode="static" priority />
        <div className={styles.technologyIdentity}>
          <DistrictMarker district="commerce" label="General technology" icon={marker.src} />
          <ProjectFeature eyebrow="Landmark 01 · structural example" name={technologyLandmark.name} relationship={technologyLandmark.relationship} status={technologyLandmark.proofStatus} headingId="technology-title" />
        </div>
      </div>
      <LandmarkReveal id="technology-evidence" variant="technology" labelledBy="technology-title">
        <div className={styles.technologyProof}>
          <div className={styles.technologyMedia}>
            <span className={styles.proofPrinciple}>Proof over promises.</span>
            <ProjectMediaSequence projectName={technologyLandmark.name} media={technologyLandmark.media} />
          </div>
          <div className={styles.technologyRegister}>
            <ResponsibilitySummary headingId="technology-responsibility" need={technologyLandmark.need} responsibility={technologyLandmark.responsibility} exclusions={technologyLandmark.exclusions} />
            <EvidenceList headingId="technology-evidence-register" items={technologyLandmark.evidence} />
          </div>
        </div>
        <nav className={styles.relatedRoutes} aria-label="Airix Food related routes">
          <CaseStudyLink href="/services" label="Services" district="Commerce District" />
          <CaseStudyLink href="/start-a-project" label="Discuss a Project" district="Gateway District" />
        </nav>
      </LandmarkReveal>
    </article>
  );
}
