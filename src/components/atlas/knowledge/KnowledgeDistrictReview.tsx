import type { CSSProperties } from "react";
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import { PrimaryNavigation } from "@/components/atlas/navigation";
import { EditorialCourtyard } from "./EditorialCourtyard";
import { KnowledgeArrival } from "./KnowledgeArrival";
import { KnowledgeContinuity } from "./KnowledgeContinuity";
import { OpenSourceWorkshop } from "./OpenSourceWorkshop";
import { PublishingCapabilityGroups } from "./PublishingCapabilityGroups";
import { PublishingSystemMap } from "./PublishingSystemMap";
import styles from "./atlas-knowledge.module.css";

interface KnowledgeDistrictReviewProps {
  scene: AtlasSceneAsset;
  marker: AtlasLibraryAsset;
  route: AtlasLibraryAsset;
  paper: AtlasLibraryAsset;
  archive: AtlasLibraryAsset;
  letterpress: AtlasLibraryAsset;
  cabinet: AtlasLibraryAsset;
  archiveSign: AtlasLibraryAsset;
  archiveStamp: AtlasLibraryAsset;
}

export function KnowledgeDistrictReview({ scene, marker, route, paper, archive, letterpress, cabinet, archiveSign, archiveStamp }: KnowledgeDistrictReviewProps) {
  const material = {
    "--knowledge-route": `url(${route.src})`,
    "--knowledge-paper": `url(${paper.src})`,
    "--knowledge-archive": `url(${archive.src})`,
    "--knowledge-letterpress": `url(${letterpress.src})`,
    "--knowledge-cabinet": `url(${cabinet.src})`,
    "--knowledge-sign": `url(${archiveSign.src})`,
    "--knowledge-stamp": `url(${archiveStamp.src})`,
  } as CSSProperties;

  return (
    <div className={styles.knowledge} style={material} data-atlas-knowledge data-artwork-status="candidate">
      <SkipJourneyLink href="#publishing-capabilities" label="Skip to publishing capabilities" />
      <PrimaryNavigation activeDistrict="knowledge" />
      <aside className={styles.reviewStatus} aria-label="Internal implementation review"><strong>Internal W4 review</strong><span>Candidate Knowledge artwork</span><span>Claims carry source states</span><span>Not approved for public use</span></aside>
      <main id="main-content">
        <KnowledgeArrival scene={scene} marker={marker} />
        <EditorialCourtyard />
        <PublishingCapabilityGroups />
        <PublishingSystemMap />
        <OpenSourceWorkshop />
        <KnowledgeContinuity />
      </main>
    </div>
  );
}
