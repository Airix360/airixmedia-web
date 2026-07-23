import type { CSSProperties } from "react";
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { PrimaryNavigation } from "@/components/atlas/navigation";
import { AtlasSignal } from "@/components/atlas/scene";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import { ArrivalMovement } from "./ArrivalMovement";
import { ArrivalOpening } from "./ArrivalOpening";
import { ArrivalReviewStatus } from "./ArrivalReviewStatus";
import { JourneyProgress } from "./JourneyProgress";
import { PropositionReveal } from "./PropositionReveal";
import styles from "./atlas-arrival.module.css";

interface ArrivalJourneyProps {
  scene: AtlasSceneAsset;
  marker: AtlasLibraryAsset;
  route: AtlasLibraryAsset;
  paper: AtlasLibraryAsset;
  haze: AtlasLibraryAsset;
}

export function ArrivalJourney({ scene, marker, route, paper, haze }: ArrivalJourneyProps) {
  const material = {
    "--arrival-paper-texture": `url(${paper.src})`,
    "--arrival-haze-texture": `url(${haze.src})`,
  } as CSSProperties;

  return (
    <div className={styles.arrival} style={material} data-atlas-arrival data-asset-status={scene.status}>
      <SkipJourneyLink href="#arrival-proposition" label="Skip Atlas journey" />
      <PrimaryNavigation activeDistrict="arrival" />
      <ArrivalReviewStatus />
      <JourneyProgress />
      <main id="main-content">
        <ArrivalOpening scene={scene} />
        <ArrivalMovement scene={scene} route={route} />
        <section id="arrival-discovery" className={styles.discovery} data-arrival-step="discovery" data-rhythm="lagos-energy" aria-labelledby="arrival-discovery-title">
          <div className={styles.discoveryRoute} aria-hidden="true"><i /><i /><i /><i /></div>
          <div className={styles.discoveryStatement}>
            <span>Connections · Handoffs · Infrastructure</span>
            <h2 id="arrival-discovery-title">Invisible systems.<br />Visible progress.</h2>
            <AtlasSignal decorative />
          </div>
        </section>
        <PropositionReveal marker={marker} />
      </main>
    </div>
  );
}
