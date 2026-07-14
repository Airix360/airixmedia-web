import { LabsReview } from "@/components/atlas/labs";import { getAtlasScene } from "@/lib/atlas/assets";
const internalReview={candidateAccess:"internal-review"} as const;
export default function Page(){return <LabsReview scene={getAtlasScene("ill-0060",internalReview)}/>}
