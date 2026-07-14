import { StudioReview } from "@/components/atlas/studio";import { getAtlasScene } from "@/lib/atlas/assets";
const internalReview={candidateAccess:"internal-review"} as const;
export default function Page(){return <StudioReview scene={getAtlasScene("ill-0050",internalReview)}/>}
