import type { DesignLabConcept } from "@/lib/design-lab";
import { AfterDarkExperience } from "./after-dark-experience";
import { InMotionExperience } from "./in-motion-experience";
import { ReassembledExperience } from "./reassembled-experience";

export function ConceptExperience({ concept }: { concept: DesignLabConcept }) {
  if (concept.slug === "after-dark") return <AfterDarkExperience concept={concept} />;
  if (concept.slug === "in-motion") return <InMotionExperience concept={concept} />;
  return <ReassembledExperience concept={concept} />;
}
