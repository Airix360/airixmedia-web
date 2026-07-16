import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PublicPage as PublicPageRecord } from "@/content/atlas/public";
import { openSourceProjects } from "@/lib/content";
import { LocalBrief } from "./PublicForms";
import { PublicArtwork, type PublicArtworkKey } from "./PublicArtwork";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";
import styles from "./atlas-public.module.css";

export function PublicPage({ page, path }: { page: PublicPageRecord; path: string }) {
  const showBrief = path === "discuss" || path === "contact";
  const showRepositories = path === "open-source" || path.startsWith("open-source/");
  return <div className={styles.site}>
    <PublicHeader/>
    <main id="main-content">
      <header className={`${styles.pageHero} ${!page.art ? styles.pageHeroNoArt : ""}`}>
        {page.art && <PublicArtwork id={page.art as PublicArtworkKey} alt={`${page.title} illustrated working environment`} priority/>}
        <div className={styles.heroScrim}/>
        <div className={styles.pageHeroCopy}><span className={styles.routeLabel}>AIRIX MEDIA / {page.eyebrow}</span><span className={styles.kicker}>{page.eyebrow}</span><h1>{page.title}</h1><p>{page.summary}</p>{page.action && <Link className={styles.primaryAction} href={page.action.href}>{page.action.label}<ArrowRight size={17}/></Link>}</div>
      </header>
      <div className={styles.pageBody}>
        <aside><span>Route</span><strong>AIRIX MEDIA / {page.eyebrow}</strong><p>Place and activity are carried by the image and the work, not a public geography label.</p></aside>
        <div className={styles.editorialSections}>{page.sections.map((section, index) => <section key={section.title}><span className={styles.sectionNumber}>0{index + 1}</span><h2>{section.title}</h2><p>{section.body}</p>{section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}</div>
      </div>
      {showRepositories && <section className={styles.repositoryList} aria-labelledby="repositories-title"><span className={styles.kicker}>VERIFIED PUBLIC REPOSITORIES</span><h2 id="repositories-title">Inspect the work at source.</h2>{openSourceProjects.map((repo, index) => <a href={repo.url} key={repo.slug}><span>0{index + 1}</span><div><strong>{repo.name}</strong><p>{repo.summary}</p></div><ArrowRight size={18}/></a>)}</section>}
      {showBrief && <LocalBrief contactMode={path === "contact"}/>} 
      <section className={styles.gatewayBand}><span>AIRIX ATLAS / GATEWAY</span><h2>Where shall we build next?</h2><Link href="/discuss">Discuss a Project <ArrowRight size={18}/></Link></section>
    </main>
    <PublicFooter/>
  </div>;
}
