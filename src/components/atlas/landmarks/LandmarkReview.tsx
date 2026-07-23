import type { CSSProperties } from "react";
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { PrimaryNavigation } from "@/components/atlas/navigation";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import { PublishingLandmark } from "./PublishingLandmark";
import { TechnologyLandmark } from "./TechnologyLandmark";
import styles from "./atlas-landmarks.module.css";

interface LandmarkReviewProps {
  technologyScene: AtlasSceneAsset;
  publishingScene: AtlasSceneAsset;
  commerceMarker: AtlasLibraryAsset;
  knowledgeMarker: AtlasLibraryAsset;
  route: AtlasLibraryAsset;
  paper: AtlasLibraryAsset;
  texture: AtlasLibraryAsset;
}

export function LandmarkReview({ technologyScene, publishingScene, commerceMarker, knowledgeMarker, route, paper, texture }: LandmarkReviewProps) {
  const material = { "--proof-texture": `url(${texture.src})` } as CSSProperties;
  return (
    <div className={styles.landmarks} style={material} data-atlas-landmarks data-artwork-status="candidate">
      <SkipJourneyLink href="#technology-evidence" label="Skip to project evidence" />
      <PrimaryNavigation activeDistrict="landmarks" />
      <aside className={styles.reviewStatus} aria-label="Internal implementation review">
        <strong>Internal W2 review</strong><span>Candidate district artwork</span><span>Claims limited to cited evidence</span><span>Not approved for public use</span>
      </aside>
      <main id="main-content">
        <header className={styles.introduction}>
          <div><span>Landmarks · Proof system</span><h1>Proof over promises.</h1></div>
          <p>An Atlas landmark opens only as far as the evidence allows.</p>
          <nav aria-label="Landmark examples"><a href="#technology-landmark">01 General technology</a><a href="#publishing-landmark">02 Scholarly publishing</a></nav>
        </header>
        <TechnologyLandmark scene={technologyScene} marker={commerceMarker} route={route} />
        <PublishingLandmark scene={publishingScene} marker={knowledgeMarker} paper={paper} />
      </main>
    </div>
  );
}
