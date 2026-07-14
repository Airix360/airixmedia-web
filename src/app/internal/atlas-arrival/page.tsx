import { ArrivalJourney } from "@/components/atlas/arrival";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";

const internalReview = { candidateAccess: "internal-review" } as const;

export default function AtlasArrivalPage() {
  const scene = getAtlasScene("ill-0001", internalReview);
  const marker = getAtlasLibraryAsset("arrivalMarker", internalReview);
  const route = getAtlasLibraryAsset("primaryRoute", internalReview);
  const paper = getAtlasLibraryAsset("warmPaper", internalReview);
  const haze = getAtlasLibraryAsset("morningHaze", internalReview);

  return <ArrivalJourney scene={scene} marker={marker} route={route} paper={paper} haze={haze} />;
}
