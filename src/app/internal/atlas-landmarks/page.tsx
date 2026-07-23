import { LandmarkReview } from "@/components/atlas/landmarks";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";

const internalReview = { candidateAccess: "internal-review" } as const;

export default function AtlasLandmarksPage() {
  return (
    <LandmarkReview
      technologyScene={getAtlasScene("ill-0003", internalReview)}
      publishingScene={getAtlasScene("ill-0002", internalReview)}
      commerceMarker={getAtlasLibraryAsset("commerceMarker", internalReview)}
      knowledgeMarker={getAtlasLibraryAsset("knowledgeMarker", internalReview)}
      route={getAtlasLibraryAsset("primaryRoute", internalReview)}
      paper={getAtlasLibraryAsset("fineHalftone", internalReview)}
      texture={getAtlasLibraryAsset("fineHalftone", internalReview)}
    />
  );
}
