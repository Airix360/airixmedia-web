import Link from "next/link";
import { W9ReviewShell, w9Styles as styles } from "@/components/atlas-w9/W9ReviewShell";
import { w9Artwork } from "@/content/atlas/w9-review";

type ReviewRoute = { name: string; path: string; state: string; art?: string; desktop: string; mobile: string };

const routes: ReviewRoute[] = [
  ["Homepage", "/", "Lagos · Arrival", "lagos-arrival"], ["Work", "/work", "Lagos · Landmarks", "lagos-arrival"],
  ["Services", "/services", "Lagos · Commerce", "lagos-arrival"], ["Publishing", "/publishing", "Oyo · Knowledge", "oyo-publishing"],
  ["OJS", "/publishing/ojs", "Oyo · Editorial route", "oyo-workflow"], ["Universities", "/publishing/universities", "Oyo · Institutional publishing", "oyo-publishing"],
  ["Journal Platforms", "/publishing/journal-platforms", "Oyo · Journal platforms", "oyo-workflow"], ["Hosting & Support", "/publishing/hosting-support", "Oyo to Rivers · Continuity", "rivers-support"],
  ["Editorial Support", "/publishing/editorial-support", "Oyo · Editorial operations", "oyo-publishing"], ["Plugins", "/publishing/plugins", "Oyo to Kaduna · Open engineering", "oyo-open-source"],
  ["Pricing", "/publishing/pricing", "Oyo · Migration", "oyo-migration"], ["Publishing Projects", "/work/ku-journals", "Lagos · Landmarks", "lagos-arrival"],
  ["Infrastructure", "/services/managed-infrastructure", "Rivers · Infrastructure", "rivers-infrastructure"], ["Support", "/support", "Rivers · Continuity", "rivers-support"],
  ["Emergency", "/support/emergency", "Rivers · Recovery", "rivers-emergency"], ["Studio", "/studio", "Edo · Studio", "edo-studio"],
  ["Open Source", "/open-source", "Kaduna · Labs", "kaduna-labs"], ["Atlas", "/atlas", "Plateau · Observatory", "plateau-observatory"],
  ["Insights", "/insights", "Plateau · Field notes", "plateau-insights"], ["Resources", "/resources", "Plateau · Resources", "plateau-resources"],
  ["Discuss", "/discuss", "Ogun · Gateway", "ogun-gateway"], ["Contact", "/contact", "Ogun · Contact", "ogun-contact"],
  ["Book", "/book", "Ogun · Booking", "ogun-booking"], ["Legal", "/legal", "Shared · Draft legal structure"]
].map(([name, path, state, art]) => {
  const item = art ? w9Artwork.find((candidate) => candidate.key === art) : undefined;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return { name, path, state, art, desktop: item?.desktop ?? `/review-screens/${slug}-desktop-full.png`, mobile: item?.mobile ?? `/review-screens/${slug}-mobile-full.png` };
});

export default function ScrollableReviewPage() {
  return <W9ReviewShell eyebrow="PRIVATE OWNER REVIEW" title="The Atlas, in one scroll." intro="A neutral, long-form review of the canonical public routes. Artwork is candidate material and all selections remain visual-only." >
    <p className={styles.disclosure}>Internal owner-review page · Review selections and notes are not saved or transmitted. Copy them manually before closing the page.</p>
    <nav className={styles.scrollToc} aria-label="Scrollable route review navigation">{routes.map((route) => <a key={route.path} href={`#review-${route.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{route.name}</a>)}</nav>
    <div className={styles.scrollRoutes}>{routes.map((route) => <section className={styles.scrollRoute} id={`review-${route.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={route.path}>
      <header className={styles.scrollRouteHead}><div><span className={styles.routeKicker}>{route.state}</span><h2>{route.name}</h2><p><code>{route.path}</code> · Current status: <strong>Ready for owner review</strong>{route.art ? <> · Candidate artwork: <strong>{w9Artwork.find((item) => item.key === route.art)?.id}</strong></> : null}</p></div><div className={styles.routeActions}><Link href={route.path}>Open live route</Link>{route.art ? <Link href={`/internal/w9-review/artwork#${route.art}`}>Artwork review</Link> : null}</div></header>
      <div className={styles.scrollImages}><figure><img src={`/review-screens/${route.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-desktop-full.png`} alt={`${route.name} desktop full-page screenshot`} loading="lazy" /><figcaption>Desktop · 1440px · click to open full size</figcaption></figure><figure><img src={`/review-screens/${route.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-mobile-full.png`} alt={`${route.name} mobile full-page screenshot`} loading="lazy" /><figcaption>Mobile · 390px · click to open full size</figcaption></figure></div>
      <fieldset className={styles.reviewControls}><legend>Visual review</legend>{["Retain", "Revise", "Replace artwork", "Needs closer review"].map((choice) => <label key={choice}><input type="radio" name={`review-${route.path}`} /> {choice}</label>)}</fieldset>
      <label className={styles.notes}>Owner notes<textarea placeholder="Add a note to copy manually before closing." /></label><a className={styles.returnTop} href="#review-contents">Return to contents ↑</a>
    </section>)}</div>
    <section id="review-summary" className={styles.scrollSummary}><h2>Final review summary</h2><p>W9 is technically verified but not launch-ready. Artwork approval, cultural and rights review, legal finalisation, localisation, production integrations and staging rehearsal remain open.</p><Link href="#review-contents">Return to contents ↑</Link></section>
  </W9ReviewShell>;
}
