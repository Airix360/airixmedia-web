import type { CSSProperties } from "react";
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import { PrimaryNavigation } from "@/components/atlas/navigation";
import { InfrastructureArrival } from "./InfrastructureArrival";
import { InfrastructureCapabilities } from "./InfrastructureCapabilities";
import { InfrastructureResponsibility } from "./InfrastructureResponsibility";
import { IntegrationTransit } from "./IntegrationTransit";
import { RecoveryRoute } from "./RecoveryRoute";
import { SupportContinuity } from "./SupportContinuity";
import styles from "./atlas-infrastructure.module.css";

interface Props {
  scene: AtlasSceneAsset; marker: AtlasLibraryAsset; bridge: AtlasLibraryAsset; streetlight: AtlasLibraryAsset; mast: AtlasLibraryAsset;
  route: AtlasLibraryAsset; nightRoute: AtlasLibraryAsset; ready: AtlasLibraryAsset; warning: AtlasLibraryAsset; confirmed: AtlasLibraryAsset; grit: AtlasLibraryAsset; rain: AtlasLibraryAsset;
}

export function InfrastructureDistrictReview({ scene, marker, bridge, streetlight, mast, route, nightRoute, ready, warning, confirmed, grit, rain }: Props) {
  const material = {
    "--infra-bridge": `url(${bridge.src})`, "--infra-streetlight": `url(${streetlight.src})`, "--infra-mast": `url(${mast.src})`,
    "--infra-route": `url(${route.src})`, "--infra-night-route": `url(${nightRoute.src})`, "--infra-ready": `url(${ready.src})`,
    "--infra-warning": `url(${warning.src})`, "--infra-confirmed": `url(${confirmed.src})`, "--infra-grit": `url(${grit.src})`, "--infra-rain": `url(${rain.src})`,
  } as CSSProperties;
  return <div className={styles.infrastructure} style={material} data-atlas-infrastructure data-artwork-status="candidate">
    <SkipJourneyLink href="#infrastructure-capabilities" label="Skip to infrastructure capabilities" />
    <PrimaryNavigation activeDistrict="infrastructure" />
    <aside className={styles.reviewStatus} aria-label="Internal implementation review"><strong>Internal W5 review</strong><span>Candidate Infrastructure artwork</span><span>Service terms scoped, not promised</span><span>Not approved for public use</span></aside>
    <main id="main-content"><InfrastructureArrival scene={scene} marker={marker} /><InfrastructureCapabilities /><SupportContinuity /><RecoveryRoute /><IntegrationTransit /><InfrastructureResponsibility /></main>
  </div>;
}
