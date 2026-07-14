import { PrimaryNavigation } from "@/components/atlas/navigation";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import { StateTransition } from "@/components/atlas/state";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import { StudioReviewStatus } from "./StudioReviewStatus";
import { StudioArrival } from "./StudioArrival";
import { WorkingCompound } from "./WorkingCompound";
import { StudioProcess } from "./StudioProcess";
import { StudioPrinciples } from "./StudioPrinciples";
import { CollaborationModel } from "./CollaborationModel";
import styles from "./atlas-studio.module.css";

export function StudioReview({ scene }: { scene: AtlasSceneAsset }) { return <div className={styles.page} data-w6-review="studio">
  <SkipJourneyLink href="#studio-process" label="Skip to Studio process" /><PrimaryNavigation activeDistrict="studio" /><StudioReviewStatus />
  <main><StudioArrival scene={scene} /><WorkingCompound /><StudioProcess /><StudioPrinciples /><CollaborationModel /><StateTransition from="edo" to="edo" href="/internal/atlas-trust" label="Continue to the Stewardship Register" mode="road" /></main>
</div>; }
