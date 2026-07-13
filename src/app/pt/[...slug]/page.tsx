import { PageTemplate } from "@/components/page-template";
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) { const { slug } = await params; return <PageTemplate path={slug.join("/")} locale="pt" />; }
