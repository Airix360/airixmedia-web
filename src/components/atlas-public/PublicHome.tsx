import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicArtwork } from "./PublicArtwork";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";
import styles from "./atlas-public.module.css";

const pathways = [
  ["01", "Work", "Verified responsibility and real interface evidence.", "/work"],
  ["02", "Services", "Websites, commerce, portals and connected systems.", "/services"],
  ["03", "Publishing", "OJS platforms and editorial operations.", "/publishing"],
  ["04", "Infrastructure", "Hosting, continuity, support and recovery.", "/services/managed-infrastructure"],
] as const;

export function PublicHome() {
  return <div className={`${styles.site} ${styles.state_lagos}`}>
    <PublicHeader/>
    <main id="main-content">
      <section className={styles.homeArrival} aria-labelledby="arrival-title">
        <PublicArtwork id="lagos-arrival" alt="Lagos lagoon, the long low span of Third Mainland Bridge, ferry routes and mainland skyline" priority/>
        <div className={styles.heroScrim}/>
        <div className={styles.arrivalCopy}><span className={styles.routeLabel}>AIRIX ATLAS / LAGOS / ARRIVAL</span><h1 id="arrival-title">Every thriving city depends on invisible systems.</h1><a href="#proposition">Enter the Atlas <ArrowRight size={17}/></a></div>
      </section>

      <section className={styles.movement}><div><span>ROUTES</span><strong>Movement</strong></div><p>People, services, transactions, records and ideas move because many systems keep their promises at once.</p><div className={styles.routeLine} aria-hidden="true"><i/><i/><i/><i/></div></section>

      <section id="proposition" className={styles.proposition}><span className={styles.kicker}>THE CITY REVEALS THE SYSTEM</span><h2>We build the invisible systems that allow ambitious organisations to thrive.</h2><p>Airix Media is a boutique creative technology studio and digital operations partner. We design, build, run and rescue websites, business systems, publishing platforms and technical infrastructure.</p><div><Link className={styles.primaryAction} href="/discuss">Discuss a Project <ArrowRight size={17}/></Link><Link className={styles.secondaryAction} href="/work">See verified work</Link></div></section>

      <section className={styles.operatingModel}><span className={styles.kicker}>BUILD. RUN. RESCUE.</span>{[["Build", "Create the right experience and operating system."], ["Run", "Maintain the infrastructure, handoffs and ownership."], ["Rescue", "Restore control when a critical system drifts or fails."]].map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</section>

      <section className={styles.proofChapter}><div className={styles.proofIntro}><span className={styles.kicker}>PROOF OVER PROMISES</span><h2>Responsibility becomes visible.</h2><p>Authentic public evidence replaces invented browser frames. Where permission, scope or outcomes are incomplete, the claim stays out.</p></div><div className={styles.proofRecord}><span>KU JOURNALS / SOURCE-CAPTURED</span><h3>A public publishing interface whose footer credits Airix Media.</h3><p>Design, development and maintenance are visible in the captured public record. Editorial decisions, institutional claims, metrics and outcomes are not attributed without evidence.</p><Link href="/work/ku-journals">Open the evidence record <ArrowRight size={16}/></Link></div></section>

      <section className={styles.pathways}><div><span className={styles.kicker}>DISTRICT PATHWAYS</span><h2>Choose the system that needs attention.</h2></div><nav aria-label="Service pathways">{pathways.map(([number, title, body, href]) => <Link key={title} href={href}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div><ArrowRight size={19}/></Link>)}</nav></section>

      <section className={styles.trustChapter}><div className={styles.trustTree} aria-hidden="true"><span/><i/><i/><i/></div><div><span className={styles.kicker}>TRUST IS AN OPERATING PRACTICE</span><h2>Stay accountable after launch.</h2><p>Clear ownership, documented decisions, maintainable systems, honest limits and a practical route back to the people responsible.</p><Link href="/studio">How Airix works <ArrowRight size={17}/></Link></div></section>

      <section className={styles.homeGateway}><span>AIRIX ATLAS / GATEWAY</span><h2>Where shall we build next?</h2><p>Start with the challenge, not a preselected package.</p><Link href="/discuss">Discuss a Project <ArrowRight size={18}/></Link></section>
    </main>
    <PublicFooter/>
  </div>;
}

