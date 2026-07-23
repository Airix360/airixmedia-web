import Link from "next/link";
import { PublicFooter } from "./atlas-public/PublicFooter";
import { PublicHeader } from "./atlas-public/PublicHeader";
import { legalDocuments, type LegalDocument } from "@/content/legal";

export function LegalPage({ document }: { document: LegalDocument }) {
  return <div className="legal-site"><PublicHeader/><main id="main-content"><header className="legal-hero"><span className="mono">{document.eyebrow}</span><h1>{document.title}</h1><p>{document.summary}</p><small>Effective {document.effectiveDate} · Version {document.version}</small></header><div className="legal-layout"><aside><strong>Legal centre</strong><nav aria-label="Legal documents">{legalDocuments.map((item) => <Link key={item.path} href={`/${item.path}`} aria-current={item.path === document.path ? "page" : undefined}>{item.name}</Link>)}</nav></aside><div className="legal-copy">{document.sections.map((section) => <section id={section.id} key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}<Link className="button" href="/contact?form=general&amp;source=/legal">Contact Airix Media</Link></div></div></main><PublicFooter/></div>;
}
