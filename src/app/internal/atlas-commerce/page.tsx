import { CommerceDistrictReview } from "@/components/atlas/commerce";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";

const internalReview = { candidateAccess: "internal-review" } as const;

export default function AtlasCommercePage() {
  return (
    <CommerceDistrictReview
      scene={getAtlasScene("ill-0003", internalReview)}
      marker={getAtlasLibraryAsset("commerceMarker", internalReview)}
      route={getAtlasLibraryAsset("primaryRoute", internalReview)}
      texture={getAtlasLibraryAsset("fineHalftone", internalReview)}
      canopy={getAtlasLibraryAsset("marketCanopy", internalReview)}
      routeMap={getAtlasLibraryAsset("commerceRouteMap", internalReview)}
      truck={getAtlasLibraryAsset("logisticsTruck", internalReview)}
      scale={getAtlasLibraryAsset("marketScale", internalReview)}
      marketLaneSign={getAtlasLibraryAsset("marketLaneSign", internalReview)}
    />
  );
}
