import { PublicPage } from "@/components/atlas-public/PublicPage";
import { getPublicPage } from "@/content/atlas/public";
export const metadata = { title: "Emergency Recovery", description: "Describe an unavailable, compromised, corrupted or severely impaired production system.", alternates: { canonical: "/support/emergency" } };
export default function Page() { return <PublicPage page={getPublicPage("support/emergency")!} path="support/emergency" />; }
