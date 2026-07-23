import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { PublicPage as PublicPageRecord, PublicSection } from "@/content/atlas/public";
import { publishingPrices } from "@/content/atlas/public";
import { openSourceCatalogue } from "@/content/atlas/open-source";
import { ContactHub } from "./ContactDialogs";
import { RouteHeroArtwork } from "./RouteHeroArtwork";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";
import { publicRouteHeroAsset, routeHeroFor, type RouteHeroAsset } from "@/lib/atlas/route-heroes";
import styles from "./atlas-public.module.css";

function ArtworkPanel({ route, label }: { route: RouteHeroAsset["route"]; label?: string }) {
  const asset = routeHeroFor(route);
  if (!asset) return null;
  return <figure className={styles.sectionVisual}><RouteHeroArtwork asset={publicRouteHeroAsset(asset)} alt={asset.alt ?? `${label ?? "Airix Media"} working environment`} variant="section"/><figcaption>{label}</figcaption></figure>;
}

function EditorialSection({ section, index, publishing }: { section: PublicSection; index: number; publishing: boolean }) {
  return <section id={section.id} className={styles.consolidatedSection}>
    <div className={styles.sectionCopy}><span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span>{section.eyebrow && <span className={styles.kicker}>{section.eyebrow}</span>}<h2>{section.title}</h2><p>{section.body}</p>
      {section.details && <dl>{section.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.body}</dd></div>)}</dl>}
      {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
      {section.action && <Link className={styles.sectionAction} href={section.action.href}>{section.action.label}<ArrowRight size={17}/></Link>}
    </div>
    {section.visualRoute && <ArtworkPanel route={section.visualRoute} label={section.eyebrow}/>}
    {publishing && section.id === "pricing" && <div className={styles.inlinePricing} aria-label="Publishing starting prices">{publishingPrices.map(([name, price]) => <div key={name}><span>{name}</span><strong>{price}</strong></div>)}</div>}
  </section>;
}

function OpenSourceCatalogue() {
  return <section className={styles.catalogue} aria-labelledby="catalogue-title"><div><span className={styles.kicker}>VERIFIED PUBLIC REPOSITORIES</span><h2 id="catalogue-title">One catalogue. Five inspectable projects.</h2><p>Compatibility and project status appear only where current public repository evidence supports them.</p></div><div className={styles.catalogueList}>{openSourceCatalogue.map((project, index) => <article id={project.slug} key={project.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><p className={styles.catalogueStatus}>{project.status} · {project.licence}</p><h3>{project.name}</h3><p>{project.summary}</p>{project.supportedVersions && <p><strong>Verified compatibility:</strong> {project.supportedVersions}</p>}<ul>{project.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>{project.warnings?.map((warning) => <small key={warning}>{warning}</small>)}</div><nav aria-label={`${project.name} links`}><a href={project.repositoryUrl} target="_blank" rel="noreferrer">Repository <ExternalLink size={15}/></a>{project.documentationUrl && <a href={project.documentationUrl} target="_blank" rel="noreferrer">Documentation <ExternalLink size={15}/></a>}<a href={project.issueUrl} target="_blank" rel="noreferrer">Issues <ExternalLink size={15}/></a></nav></article>)}</div></section>;
}

function ContactArtwork() {
  return <section className={styles.contactArtwork} aria-labelledby="contact-artwork-title"><div><span className={styles.kicker}>PRESERVED CONTACT ROUTES</span><h2 id="contact-artwork-title">Project context and consultation remain distinct.</h2></div><div><ArtworkPanel route="/discuss" label="Project discussion"/><ArtworkPanel route="/book" label="Consultation request"/></div></section>;
}

export function PublicPage({ page, path }: { page: PublicPageRecord; path: string }) {
  const routeHero = routeHeroFor(path);
  const isPublishing = path === "publishing";
  return <div className={styles.site}>
    <PublicHeader/>
    <main id="main-content">
      <header className={styles.pageHero}>
        {routeHero && <RouteHeroArtwork asset={publicRouteHeroAsset(routeHero)} alt={routeHero.alt ?? `${page.title} illustrated working environment`} priority/>}
        <div className={styles.heroScrim}/>
        <div className={styles.pageHeroCopy}><span className={styles.routeLabel}>AIRIX MEDIA / {page.eyebrow}</span><span className={styles.kicker}>{page.eyebrow}</span><h1>{page.title}</h1><p>{page.summary}</p>{page.action && <Link className={styles.primaryAction} href={page.action.href}>{page.action.label}<ArrowRight size={17}/></Link>}</div>
      </header>
      {path === "contact" ? <ContactHub/> : <div className={styles.consolidatedSections}>{page.sections.map((section, index) => <EditorialSection key={section.id ?? section.title} section={section} index={index} publishing={isPublishing}/>)}</div>}
      {path === "open-source" && <OpenSourceCatalogue/>}
      {path === "contact" && <ContactArtwork/>}
      <section className={styles.gatewayBand}><span>AIRIX ATLAS / GATEWAY</span><h2>Where shall we build next?</h2><Link href="/contact?form=project">Discuss a Project <ArrowRight size={18}/></Link></section>
    </main>
    <PublicFooter/>
  </div>;
}
