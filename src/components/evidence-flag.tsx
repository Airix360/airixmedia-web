import type { EvidenceState } from "@/lib/content";

export function EvidenceFlag({ state }: { state: EvidenceState }) {
  if (process.env.NODE_ENV === "production" || ["verified", "owner_confirmed"].includes(state)) return null;
  return <span className="verification">REVIEW · {state.replaceAll("_", " ")}</span>;
}
