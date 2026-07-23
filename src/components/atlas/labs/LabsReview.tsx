import { PrimaryNavigation } from "@/components/atlas/navigation";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import { StateTransition } from "@/components/atlas/state";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import { LabsReviewStatus } from "./LabsReviewStatus";
import { LabsArrival } from "./LabsArrival";
import { ExperimentRegistry } from "./ExperimentRegistry";
import { OpenSourceWorkbench } from "./OpenSourceWorkbench";
import { PrototypeStatus } from "./PrototypeStatus";
import styles from "./atlas-labs.module.css";
import auditStyles from "@/components/atlas/state/state-audit.module.css";
export function LabsReview({
  scene,
  auditMode = false,
}: {
  scene: AtlasSceneAsset;
  auditMode?: boolean;
}) {
  return (
    <div
      className={`${styles.page} ${auditMode ? auditStyles.hidden : ""}`}
      data-w6-review="labs"
      data-state-audit={auditMode ? "hidden-labels" : "labelled"}
    >
      <SkipJourneyLink
        href="#experiment-registry"
        label="Skip to experiment registry"
      />
      <PrimaryNavigation activeDistrict="labs" />
      <LabsReviewStatus />
      <main>
        <LabsArrival scene={scene} />
        <ExperimentRegistry />
        <OpenSourceWorkbench />
        <PrototypeStatus />
        <StateTransition
          from="kaduna"
          to="edo"
          href="/internal/atlas-studio"
          label="Return to Studio"
          mode="rail"
        />
      </main>
    </div>
  );
}
