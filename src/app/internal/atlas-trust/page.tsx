import { TrustReview } from "@/components/atlas/trust";import { getAtlasScene } from "@/lib/atlas/assets";
import {hasHiddenStateLabels,type StateAuditSearchParams} from "@/lib/atlas/state-audit";
const internalReview={candidateAccess:"internal-review"} as const;
export default async function Page({searchParams}:{searchParams:StateAuditSearchParams}){return <TrustReview auditMode={await hasHiddenStateLabels(searchParams)} scene={getAtlasScene("ill-0071",internalReview)}/>}
