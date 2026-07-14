import { PrimaryNavigation } from "@/components/atlas/navigation";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import { StateTransition } from "@/components/atlas/state";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import { TrustReviewStatus } from "./TrustReviewStatus";import { TrustArrival } from "./TrustArrival";import { TrustRegister } from "./TrustRegister";import { EvidenceStandard } from "./EvidenceStandard";import { ResponsibilityBoundary } from "./ResponsibilityBoundary";import { KnownLimitations } from "./KnownLimitations";
import styles from "./atlas-trust.module.css";
export function TrustReview({scene}:{scene:AtlasSceneAsset}){return <div className={styles.page} data-w6-review="trust"><SkipJourneyLink href="#trust-register" label="Skip to Trust register"/><PrimaryNavigation activeDistrict="studio"/><TrustReviewStatus/><main><TrustArrival scene={scene}/><TrustRegister/><EvidenceStandard/><ResponsibilityBoundary/><KnownLimitations/><StateTransition from="edo" to="kaduna" href="/internal/atlas-labs" label="Travel to Labs" mode="rail"/></main></div>}
