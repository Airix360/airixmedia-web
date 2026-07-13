import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { caseStudies, openSourceProjects, type Locale } from "@/lib/content";
import { getLocalisedPageDefinition } from "@/lib/pages";
import { Footer } from "./footer";
import { Header } from "./header";
import { EvidenceFlag } from "./evidence-flag";

const routeFor = (locale: Locale, path: string) => locale === "en" ? path : `/${locale}${path}`;

export function PageTemplate({ path, locale = "en" }: { path: string; locale?: Locale }) {
  if (path === "systems") return <SystemsPage locale={locale} />;
  if (path.startsWith("systems/")) return <CasePage slug={path.split("/")[1]} locale={locale} />;
  if (path === "open-source") return <OpenSourcePage locale={locale} />;
  if (path.startsWith("open-source/")) return <OpenSourcePage locale={locale} focus={path.split("/")[1]} />;
  const page = getLocalisedPageDefinition(path, locale);
  if (!page) notFound();
  return <><Header locale={locale} /><main id="main-content"><header className="page-hero"><div className="shell"><span className="mono">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.summary}</p></div></header><section className="section"><div className="shell page-grid"><aside><span className="mono">AIRIX MEDIA · {page.eyebrow}</span></aside><div className="content-stack">{page.sections.map((section) => <article key={section.title}><h2>{section.title}</h2><p className="section-copy">{section.body}</p>{section.items && <div className="detail-list">{section.items.map((item) => <div key={item}>{item}</div>)}</div>}</article>)}<Link className="button" href={routeFor(locale, "/start-a-project")}>Start a project <ArrowRight size={18} /></Link></div></div></section></main><Footer locale={locale} /></>;
}

function SystemsPage({ locale }: { locale: Locale }) { return <><Header locale={locale} /><main id="main-content"><header className="page-hero"><div className="shell"><span className="mono">SELECTED SYSTEMS · INTERNAL REVIEW</span><h1>Systems that connect experience, operations, and ownership.</h1><p>All six case studies remain behind owner-approval flags. Draft narratives are visible in local review only.</p></div></header><section className="section"><div className="shell case-grid">{caseStudies.map((item) => <Link className="case-item" href={routeFor(locale, `/systems/${item.slug}`)} key={item.slug}><div><EvidenceFlag state={item.evidence} /><span className="mono">{item.type === "airix_venture" ? "AIRIX 360 VENTURE" : item.sector}</span><h2>{item.name}</h2></div><div><p>{item.summary}</p><span className="text-link">Review case study <ArrowRight size={15} /></span></div></Link>)}</div></section></main><Footer locale={locale} /></>; }

function CasePage({ slug, locale }: { slug: string; locale: Locale }) { const item = caseStudies.find((entry) => entry.slug === slug); if (!item) notFound(); return <><Header locale={locale} /><main id="main-content"><header className="page-hero"><div className="shell"><EvidenceFlag state={item.evidence} /><span className="mono">{item.type === "airix_venture" ? "AIRIX 360 SISTER VENTURE" : item.sector}</span><h1>{item.name}</h1><p>{item.summary}</p></div></header><section className="section"><div className="shell page-grid"><aside className="mono">OWNER APPROVAL REQUIRED</aside><div className="content-stack"><article><h2>Challenge</h2><p className="section-copy">{item.challenge}</p></article><article><h2>System</h2><p className="section-copy">{item.solution}</p></article><article><h2>Ongoing role</h2><p className="section-copy">{item.ongoingRole}</p></article><article><h2>Verified outcomes</h2><p className="section-copy">No measurable outcome is published until evidence and client permission are recorded.</p></article><Link className="button" href={routeFor(locale, "/start-a-project")}>Discuss a related system</Link></div></div></section></main><Footer locale={locale} /></>; }

function OpenSourcePage({ locale, focus }: { locale: Locale; focus?: string }) { const projects = focus ? openSourceProjects.filter((project) => project.slug === focus) : openSourceProjects; if (!projects.length) notFound(); return <><Header locale={locale} /><main id="main-content"><header className="page-hero"><div className="shell"><span className="mono">OPEN SOURCE</span><h1>Publishing infrastructure improved in public.</h1><p>Product engineering, payment workflows, security thinking, and long-term maintainability made visible through public repositories.</p></div></header><section className="section"><div className="shell content-stack">{projects.map((project) => <article className="page-grid" key={project.slug}><span className="mono">{project.area}</span><div><h2>{project.name}</h2><p className="section-copy">{project.summary}</p><a className="text-link" href={project.url} target="_blank" rel="noreferrer">View public repository <ExternalLink size={16} /></a><p className="mono">Built and maintained by Airix Media. Lead maintainer: Hendrix Nwaokolo.</p></div></article>)}</div></section></main><Footer locale={locale} /></>; }
