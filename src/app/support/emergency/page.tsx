import { PublicPage } from "@/components/atlas-public/PublicPage";
import { getPublicPage } from "@/content/atlas/public";
export default function Page() { return <PublicPage page={getPublicPage("support/emergency")!} path="support/emergency" />; }
