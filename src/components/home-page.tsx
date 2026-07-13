import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Header } from "./header";
import { Footer } from "./footer";
import { SelectedSystems } from "./selected-systems";
import { copy, openSourceProjects, practices, contact, type Locale } from "@/lib/content";

const routeFor = (locale: Locale, path: string) => locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;

export function HomePage({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  return <>
    <Header locale={locale} />
    <main id="main-content">
      <section className="hero">
        <div className="hero-grid" aria-hidden="true"><svg width="100%" height="100%"><defs><pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg></div>
        <svg className="hero-route" viewBox="0 0 900 700" aria-hidden="true"><path className="route-line" d="M35 90H420V210H790V405H545V620H850" /><path className="route-line" d="M120 0V310H335V510H645V700" /><path className="route-line live" d="M0 560H180V390H470V125H900" /></svg>
        <span className="system-node node-web">Business website</span><span className="system-node node-publish">Journal platform</span><span className="system-node node-payments">Payments + API</span><span className="system-node node-portal">Client portal</span><span className="system-node node-support">Support workflow</span>
        <div className="shell hero-content"><div className="hero-label mono">CREATIVE TECHNOLOGY · DIGITAL OPERATIONS</div><h1>{t.hero.title}</h1><p>{t.hero.body}</p><div className="hero-actions"><Link className="button" href={routeFor(locale, "/start-a-project")}>{t.hero.primary}<ArrowRight size={18} /></Link><Link className="button secondary" href={routeFor(locale, "/systems")}>{t.hero.secondary}</Link></div></div>
      </section>

      <div className="proof-strip"><div className="shell proof-inner"><span className="mono">SELECTED SYSTEMS UNDER REVIEW</span><div className="proof-list"><span>AJTMBR</span><span>KU Journals</span><span>FarmaTrak</span><span>BoredRoom</span></div><span className="verification">OWNER APPROVAL REQUIRED</span></div></div>

      <section className="section"><div className="shell"><h2 className="section-heading">Five practices. One accountable partner.</h2><div className="practice-list">{practices.map((practice) => <Link href={practice.slug === "publishing" ? routeFor(locale, "/publishing") : routeFor(locale, `/services/${practice.slug}`)} className={`practice-row accent-${practice.accent}`} key={practice.slug}><span className="practice-name"><i className="practice-dot" />{practice.name}</span><p>{practice.summary}</p><ArrowRight size={20} /></Link>)}</div></div></section>

      <section className="section operating"><div className="shell"><h2 className="section-heading">{t.model.title}</h2><p className="section-copy">Launch is the beginning, not the end. Airix remains accountable for what the system becomes after it goes live.</p><div className="model-grid"><div className="model-step"><span className="mono">01 · CREATE</span><div><strong>Build.</strong><p>{t.model.build}</p></div></div><div className="model-step"><span className="mono">02 · OPERATE</span><div><strong>Run.</strong><p>{t.model.run}</p></div></div><div className="model-step"><span className="mono">03 · RECOVER</span><div><strong>Rescue.</strong><p>{t.model.rescue}</p></div></div></div></div></section>

      <section className="section"><div className="shell"><div className="systems-head"><div><h2 className="section-heading">Selected Systems</h2><p className="section-copy">Work that shows how strategy, engineering, publishing operations, and long-term support meet.</p></div><Link className="text-link" href={routeFor(locale, "/systems")}>View all case studies <ArrowRight size={16} /></Link></div><SelectedSystems /></div></section>

      <section className="section"><div className="shell publishing-grid"><div><span className="mono">AIRIX PUBLISHING TECHNOLOGY</span><h2 className="section-heading">African journals deserve world-class publishing infrastructure.</h2><p className="section-copy">Specialist OJS platforms, upgrades, hosting, plugins, editorial workflows, training, and technical publishing support.</p><Link className="button" href={routeFor(locale, "/publishing")}>Explore publishing services</Link></div><div className="workflow" aria-label="Publishing workflow"><div className="workflow-step"><span className="mono">01</span><strong>Submission</strong><i /></div><div className="workflow-step"><span className="mono">02</span><strong>Editorial review</strong><i /></div><div className="workflow-step"><span className="mono">03</span><strong>Payment and metadata</strong><i /></div><div className="workflow-step"><span className="mono">04</span><strong>Publication</strong><i /></div><div className="workflow-step"><span className="mono">05</span><strong>Operations and support</strong><i /></div></div></div></section>

      <section className="section"><div className="shell"><h2 className="section-heading">Engineering in the open.</h2><p className="section-copy">Open-source work is evidence of product thinking, OJS depth, payment engineering, and commitment to maintainable publishing infrastructure.</p><div className="opensource-list">{openSourceProjects.map((project) => <a className="opensource-row" href={project.url} target="_blank" rel="noreferrer" key={project.slug}><span className="mono">{project.area}</span><strong>{project.name}</strong><ExternalLink size={17} /></a>)}</div></div></section>

      <section className="section rescue"><div className="shell"><span className="mono">SUPPORT · RECOVERY · CONTINUITY</span><h2 className="section-heading">When the system is failing, restore control first.</h2><p className="section-copy">Airix audits, recovers, migrates, documents, and stabilises abandoned, compromised, or poorly implemented systems. Emergency submission does not guarantee immediate response or resolution.</p><div className="rescue-actions"><Link className="button" href={routeFor(locale, "/support/emergency")}>Describe an emergency</Link><Link className="button secondary" href={routeFor(locale, "/support")}>Explore ongoing support</Link></div></div></section>

      <section className="section"><div className="shell portal-panel"><div className="portal-copy"><span className="mono">AIRIX CLIENT PORTAL</span><h2 className="section-heading">A clearer view of the work.</h2><p className="section-copy">Clients can review projects, approve deliverables, and manage billing in a separate workspace. The public site remains independent of portal availability.</p><a className="text-link" href={contact.portal}>Open the client portal <ExternalLink size={16} /></a></div><div className="portal-visual"><div className="portal-orbit"><span className="orbit-label orbit-one">Projects</span><span className="orbit-label orbit-two">Approvals</span><span className="orbit-label orbit-three">Billing</span></div></div></div></section>

      <section className="section"><div className="shell"><h2 className="section-heading">A deliberate path from uncertainty to ownership.</h2><div className="process-grid"><div className="process-item"><span className="mono">01</span><b>Understand</b><p>Map the business need, current system, risks, users, and evidence.</p></div><div className="process-item"><span className="mono">02</span><b>Define</b><p>Agree scope, architecture, delivery path, responsibilities, and measures.</p></div><div className="process-item"><span className="mono">03</span><b>Build</b><p>Design and implement in reviewable stages with controlled validation.</p></div><div className="process-item"><span className="mono">04</span><b>Stay</b><p>Operate, monitor, support, and improve after launch.</p></div></div></div></section>

      <section className="section"><div className="shell selector-promo"><div><span className="mono">PROJECT SELECTOR</span><h2 className="section-heading">Start with the problem, not a shopping list.</h2></div><div><p className="section-copy">Answer a focused set of questions and receive a preliminary service recommendation. Airix reviews every brief before scope or pricing is confirmed.</p><Link className="button" href={routeFor(locale, "/start-a-project")}>Build your project brief <ArrowRight size={18} /></Link></div></div></section>
    </main>
    <Footer locale={locale} />
  </>;
}
