import { KnowledgeDistrictReview } from "@/components/atlas/knowledge";
import { getAtlasLibraryAsset, getAtlasScene } from "@/lib/atlas/assets";

const internalReview = { candidateAccess: "internal-review" } as const;

export default function AtlasKnowledgePage() {
  return (
    <KnowledgeDistrictReview
      scene={getAtlasScene("ill-0002", internalReview)}
      marker={getAtlasLibraryAsset("knowledgeMarker", internalReview)}
      route={getAtlasLibraryAsset("primaryRoute", internalReview)}
      paper={getAtlasLibraryAsset("fineHalftone", internalReview)}
      archive={getAtlasLibraryAsset("communityArchive", internalReview)}
      letterpress={getAtlasLibraryAsset("letterpress", internalReview)}
      cabinet={getAtlasLibraryAsset("archiveCabinet", internalReview)}
      archiveSign={getAtlasLibraryAsset("archiveRoomSign", internalReview)}
      archiveStamp={getAtlasLibraryAsset("archiveCopyStamp", internalReview)}
    />
  );
}
