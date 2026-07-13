import { ConceptExperience } from "@/components/design-lab/concept-experience";
import { getDesignLabConcept } from "@/lib/design-lab";

export default function ReassembledPage() {
  return <ConceptExperience concept={getDesignLabConcept("reassembled")} />;
}
