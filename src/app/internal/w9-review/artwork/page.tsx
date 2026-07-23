import { ArtworkReview } from "@/components/atlas-w9/ArtworkReview";
import { W9ReviewShell } from "@/components/atlas-w9/W9ReviewShell";
import { w9Artwork } from "@/content/atlas/w9-review";

export default function W9ArtworkPage() {
  return <W9ReviewShell eyebrow="ARTWORK REGISTER" title="Every active image, in context." intro="Sixteen active public artwork families across Lagos, Oyo, Rivers, Edo, Kaduna, Plateau and Ogun. Desktop and mobile compositions are shown without page copy so cropping and recognition can be judged directly."><ArtworkReview assets={w9Artwork}/></W9ReviewShell>;
}
