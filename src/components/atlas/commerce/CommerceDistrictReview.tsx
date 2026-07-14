import type { CSSProperties } from "react";
import type { AtlasLibraryAsset, AtlasSceneAsset } from "@/lib/atlas/types";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import { PrimaryNavigation } from "@/components/atlas/navigation";
import { CommerceArrival } from "./CommerceArrival";
import { CommerceContinuity } from "./CommerceContinuity";
import { CommercePathways } from "./CommercePathways";
import { ConnectedCommerceSystem } from "./ConnectedCommerceSystem";
import { ExchangeFlow } from "./ExchangeFlow";
import styles from "./atlas-commerce.module.css";

interface CommerceDistrictReviewProps {
  scene: AtlasSceneAsset;
  marker: AtlasLibraryAsset;
  route: AtlasLibraryAsset;
  texture: AtlasLibraryAsset;
  canopy: AtlasLibraryAsset;
  routeMap: AtlasLibraryAsset;
  truck: AtlasLibraryAsset;
  scale: AtlasLibraryAsset;
  marketLaneSign: AtlasLibraryAsset;
}

export function CommerceDistrictReview({ scene, marker, route, texture, canopy, routeMap, truck, scale, marketLaneSign }: CommerceDistrictReviewProps) {
  const material = {
    "--commerce-texture": `url(${texture.src})`,
    "--commerce-route": `url(${route.src})`,
    "--commerce-canopy": `url(${canopy.src})`,
    "--commerce-map": `url(${routeMap.src})`,
    "--commerce-truck": `url(${truck.src})`,
    "--commerce-scale": `url(${scale.src})`,
    "--commerce-sign": `url(${marketLaneSign.src})`,
  } as CSSProperties;

  return (
    <div className={styles.commerce} style={material} data-atlas-commerce data-artwork-status="candidate">
      <SkipJourneyLink href="#commerce-pathways" label="Skip to service pathways" />
      <PrimaryNavigation activeDistrict="commerce" />
      <aside className={styles.reviewStatus} aria-label="Internal implementation review">
        <strong>Internal W3 review</strong><span>Candidate Commerce artwork</span><span>Unverified wording disclosed</span><span>Not approved for public use</span>
      </aside>
      <main id="main-content">
        <CommerceArrival scene={scene} marker={marker} />
        <ExchangeFlow />
        <CommercePathways />
        <ConnectedCommerceSystem />
        <CommerceContinuity />
      </main>
    </div>
  );
}
