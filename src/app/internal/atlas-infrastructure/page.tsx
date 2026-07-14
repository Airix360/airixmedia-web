import { InfrastructureDistrictReview } from "@/components/atlas/infrastructure";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";

const internalReview = { candidateAccess: "internal-review" } as const;

export default function AtlasInfrastructurePage() {
  return <InfrastructureDistrictReview
    scene={getAtlasScene("ill-0004", internalReview)} marker={getAtlasLibraryAsset("infrastructureMarker", internalReview)}
    bridge={getAtlasLibraryAsset("thirdMainlandBridge", internalReview)} streetlight={getAtlasLibraryAsset("utilityStreetlight", internalReview)} mast={getAtlasLibraryAsset("telecomMast", internalReview)}
    route={getAtlasLibraryAsset("secondaryRoute", internalReview)} nightRoute={getAtlasLibraryAsset("nightRoute", internalReview)} ready={getAtlasLibraryAsset("statusReadyLabel", internalReview)}
    warning={getAtlasLibraryAsset("warningLabel", internalReview)} confirmed={getAtlasLibraryAsset("routeConfirmedStamp", internalReview)} grit={getAtlasLibraryAsset("roadGrit", internalReview)} rain={getAtlasLibraryAsset("rain", internalReview)}
  />;
}
