import { ConceptExperience } from "@/components/design-lab/concept-experience";
import { getDesignLabConcept } from "@/lib/design-lab";

export default function InMotionPage() {
  return <ConceptExperience concept={getDesignLabConcept("in-motion")} />;
}
