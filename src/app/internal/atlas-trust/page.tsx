import { TrustReview } from "@/components/atlas/trust";import { getAtlasScene } from "@/lib/atlas/assets";
const internalReview={candidateAccess:"internal-review"} as const;
export default function Page(){return <TrustReview scene={getAtlasScene("ill-0070",internalReview)}/>}
