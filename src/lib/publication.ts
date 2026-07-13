import type { EvidenceState } from "./content";

const publishable = new Set<EvidenceState>(["verified", "owner_confirmed"]);

export function canPublish(state: EvidenceState, production = process.env.NODE_ENV === "production") {
  return production ? publishable.has(state) : state !== "do_not_publish";
}

export function filterPublishable<T extends { evidence: EvidenceState }>(items: T[], production?: boolean) {
  return items.filter((item) => canPublish(item.evidence, production));
}

