import { StudioReview } from "@/components/atlas/studio";import { getAtlasScene } from "@/lib/atlas/assets";
import {hasHiddenStateLabels,type StateAuditSearchParams} from "@/lib/atlas/state-audit";
const internalReview={candidateAccess:"internal-review"} as const;
export default async function Page({searchParams}:{searchParams:StateAuditSearchParams}){return <StudioReview auditMode={await hasHiddenStateLabels(searchParams)} scene={getAtlasScene("ill-0051",internalReview)}/>}
