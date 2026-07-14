import type { AtlasStateId } from "@/lib/atlas/types";

export interface AtlasStateContextRecord {
  id: AtlasStateId;
  name: string;
  orientation: string;
  material: string;
  transition: string;
}

export const atlasStateContexts: Partial<Record<AtlasStateId, AtlasStateContextRecord>> = {
  lagos: { id: "lagos", name: "Lagos State", orientation: "Capital and primary Atlas orientation", material: "Lagoon routes, civic density, cream paper and terracotta", transition: "Wider Atlas" },
  edo: { id: "edo", name: "Edo State", orientation: "Craft, authorship and stewardship", material: "Earth, timber, paper, bronze-toned hardware and shade", transition: "Road from Lagos · state review prototype" },
  kaduna: { id: "kaduna", name: "Kaduna State", orientation: "Engineering, testing and useful invention", material: "Rail logic, red earth, weathered steel and dry-season light", transition: "Rail from Lagos · state review prototype" },
};
