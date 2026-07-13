import { ConceptExperience } from "@/components/design-lab/concept-experience";
import { getDesignLabConcept } from "@/lib/design-lab";

export default function AfterDarkPage() {
  return <ConceptExperience concept={getDesignLabConcept("after-dark")} />;
}
