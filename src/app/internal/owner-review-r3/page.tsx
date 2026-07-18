import Image from "next/image";
import { r3Wave1Review, r3Wave1SharedDecisions } from "@/lib/atlas/r3-wave1";
import { r3Wave2Decision, r3Wave2Review } from "@/lib/atlas/r3-wave2";
import { contactFormDefinitions, contactFormKeys } from "@/lib/contact-forms";
import { retainedPublicRoutes, routeConsolidationRedirects } from "@/lib/route-consolidation";
import { routeHeroAssets } from "@/lib/atlas/route-heroes";
import { getContactProviderReadiness } from "@/lib/contact-submission";
import styles from "../owner-review-r2/review.module.css";

const wave2Captures = [
  ["Desktop Light", "desktop-light.png", 1440, 1000],
  ["Desktop Dark", "desktop-dark.png", 1440, 1000],
  ["Tablet Light", "tablet-light.png", 768, 1024],
  ["390px Light", "mobile-390-light.png", 390, 844],
  ["390px Dark", "mobile-390-dark.png", 390, 844],
  ["360px Light", "mobile-360-light.png", 360, 800],
] as const;

export const dynamic = "force-dynamic";

export default function OwnerReviewR3() {
  const operational = getContactProviderReadiness();
  return <main className={styles.review}>
    <header>
      <span>PRIVATE · NOINDEX · OWNER REVIEW R3</span>
      <h1>Adaptive artwork decision record.</h1>
      <p>Owner direction, technical integration, cultural review, rights review and launch review are recorded separately. Public routes receive only public-safe artwork properties.</p>
      <ul>{r3Wave1SharedDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
    </header>

    <h2>Wave 1</h2>
    {r3Wave1Review.map((record) => <section key={record.route} data-review-route={record.route}>
      <div className={styles.heading}><div><span>{record.ownerDecision}</span><h2>{record.route}</h2><p>{record.landmark}</p><p><strong>Remaining verification:</strong> {record.remainingVerification.join(" · ")}</p><p className={styles.warning}><strong>Launch restriction:</strong> {record.launchRestriction}</p><p><strong>Responsible next action:</strong> {record.nextAction}</p></div><dl><div><dt>Source</dt><dd>1536×1024 PNG</dd></div><div><dt>Runtime</dt><dd>1536×1024 WebP</dd></div><div><dt>Focal</dt><dd>{record.desktopPosition} / {record.mobilePosition}</dd></div></dl></div>
      <div className={styles.assets}><figure><Image src={`/atlas/heroes/${record.runtimeDay}`} alt="" width={768} height={512}/><figcaption>{record.runtimeDay} · {record.dayBytes} bytes · luminance {record.dayLuminance}</figcaption></figure><figure><Image src={`/atlas/heroes/${record.runtimeNight}`} alt="" width={768} height={512}/><figcaption>{record.runtimeNight} · {record.nightBytes} bytes · luminance {record.nightLuminance}</figcaption></figure></div>
      <p className={styles.captureNote}>Perceptual difference: {record.difference}. Source SHA-256: {record.sourceDaySha} / {record.sourceNightSha}. Runtime SHA-256: {record.runtimeDaySha} / {record.runtimeNightSha}.</p>
    </section>)}

    <h2>Wave 2 service artwork</h2>
    <p>All routes are technically integrated and owner-direction-approved. They remain pending cultural, rights and launch review.</p>
    {r3Wave2Review.map((record) => <section key={record.route} data-review-route={record.route}>
      <div className={styles.heading}><div><span>{r3Wave2Decision.ownerDecision}</span><h2>{record.route}</h2><p>{record.subject}</p><p><strong>Technical status:</strong> {r3Wave2Decision.technicalStatus}</p><p><strong>Remaining review:</strong> {r3Wave2Decision.remainingReview.join(" · ")}</p><p className={styles.warning}><strong>Known defects:</strong> {r3Wave2Decision.knownDefects}</p></div><dl><div><dt>Source</dt><dd>{r3Wave2Decision.sourceDimensions}</dd></div><div><dt>Runtime</dt><dd>{r3Wave2Decision.runtimeDimensions}</dd></div><div><dt>Focal</dt><dd>{r3Wave2Decision.desktopPosition} / {r3Wave2Decision.mobilePosition}</dd></div></dl></div>
      <div className={styles.assets}><figure><Image src={`/atlas/heroes/${record.runtimeDay}`} alt="" width={768} height={512}/><figcaption>{record.sourceDay} → {record.runtimeDay} · {record.dayBytes} bytes</figcaption></figure><figure><Image src={`/atlas/heroes/${record.runtimeNight}`} alt="" width={768} height={512}/><figcaption>{record.sourceNight} → {record.runtimeNight} · {record.nightBytes} bytes</figcaption></figure></div>
      <p className={styles.captureNote}>Source SHA-256: {record.sourceDaySha} / {record.sourceNightSha}. Runtime SHA-256: {record.runtimeDaySha} / {record.runtimeNightSha}. Luminance: {record.dayLuminance} / {record.nightLuminance}. Perceptual difference: {record.difference}.</p>
      <p className={styles.captureNote}><strong>Light currentSrc and initial request:</strong> /atlas/heroes/{record.runtimeDay}<br/><strong>Dark currentSrc and initial request:</strong> /atlas/heroes/{record.runtimeNight}<br/>Fresh saved and Auto evidence: <code>output/playwright/atlas-artwork-r3-wave2/fresh-session-request-report.json</code>.</p>
      <div className={styles.evidence}>{wave2Captures.map(([label, suffix, width, height]) => <figure key={suffix}><Image unoptimized src={`/internal/owner-review-r3/evidence/${record.key}-${suffix}`} alt="" width={width} height={height}/><figcaption>{label}</figcaption></figure>)}</div>
    </section>)}

    <h2>Route Consolidation</h2>
    <section data-review-route="route-consolidation">
      <div className={styles.heading}><div><span>R3 ARCHITECTURE CHANGE</span><h2>44 canonical English routes become 16 focused pages.</h2><p>The public interface now centres on a small number of substantial editorial pages. Removed routes resolve through permanent redirects; form query states retain the `/contact` canonical.</p></div><dl><div><dt>Old sitemap</dt><dd>44 routes</dd></div><div><dt>New sitemap</dt><dd>{retainedPublicRoutes.length} routes</dd></div><div><dt>Redirects</dt><dd>{routeConsolidationRedirects.length} recorded</dd></div></dl></div>
      <h3>Retained sitemap</h3><p>{retainedPublicRoutes.join(" · ")}</p>
      <h3>Redirect and removed-canonical table</h3>
      <div className={styles.captureNote}>{routeConsolidationRedirects.map((redirect) => <p key={redirect.source}><code>{redirect.source}</code> → <code>{redirect.destination}</code> · 308 · canonical removed · sitemap removed · {redirect.reason}</p>)}</div>
      <h3>Artwork disposition</h3><p>{Object.keys(routeHeroAssets).length} approved or review-gated day/night pairs remain in the typed asset registry. Page heroes, section visuals, supporting panels and preserved internal archive entries are documented in <code>docs/atlas-artwork-disposition-r3.md</code>.</p>
      <h3>Contact architecture</h3>
      <div className={styles.captureNote}>{contactFormKeys.map((key) => <p key={key}><strong>{contactFormDefinitions[key].title}</strong> · <code>/contact?form={key}</code> · {contactFormDefinitions[key].fields.length} fields</p>)}</div>
      <div className={styles.evidence}><figure><Image unoptimized src="/internal/owner-review-r3/evidence/contact-project-desktop.png" alt="" width={1440} height={1000}/><figcaption>Project dialog · desktop</figcaption></figure><figure><Image unoptimized src="/internal/owner-review-r3/evidence/contact-publishing-mobile.png" alt="" width={390} height={844}/><figcaption>Publishing dialog · mobile</figcaption></figure><figure><Image unoptimized src="/internal/owner-review-r3/evidence/navigation-desktop.png" alt="" width={1440} height={1000}/><figcaption>Consolidated navigation</figcaption></figure></div>
      <h3>Legal and navigation result</h3><p>Standalone Privacy, Terms, Service Terms, Security, Data Processing and Subprocessors remain procurement-safe routes. Cookies, accessibility and acceptable use are anchored in the Legal centre. Primary navigation is Work, Services, Publishing, Open Source, Studio and Contact; utilities are Support, Emergency and Client Portal.</p>
      <h3>Verification proof</h3><p>Automated redirect, anchor, sitemap, canonical, navigation, privacy-link and dialog-behaviour tests live in <code>src/lib/route-consolidation.test.ts</code>, <code>src/lib/contact-forms.test.ts</code> and <code>tests/route-consolidation-r3.spec.ts</code>. Generated screenshots are read from <code>output/playwright/atlas-route-consolidation-r3/</code>.</p>
    </section>

    <h2>Operational Forms</h2>
    <section data-review-route="operational-forms">
      <div className={styles.heading}><div><span>PRIVATE CONFIGURATION EVIDENCE</span><h2>Delivery is truthful and configuration-gated.</h2><p>Provider names and logical routing groups are shown without credentials, recipient addresses or provider error bodies.</p></div><dl><div><dt>Contact provider</dt><dd>{operational.contactProvider}</dd></div><div><dt>Emergency provider</dt><dd>{operational.emergencyProvider}</dd></div><div><dt>Overall readiness</dt><dd>{operational.ready ? "configured" : "configuration required"}</dd></div></dl></div>
      <h3>Logical routing groups</h3><div className={styles.captureNote}>{Object.entries(operational.routingGroups).map(([group, ready]) => <p key={group}><strong>{group}</strong> · {ready ? "configured" : "missing or invalid"}</p>)}</div>
      <h3>Provider and safeguard checks</h3><div className={styles.captureNote}>{Object.entries(operational.checks).map(([check, ready]) => <p key={check}><strong>{check}</strong> · {ready ? "ready" : "not ready"}</p>)}</div>
      <h3>Mocked evidence register</h3><p>Project, publishing, support and emergency success; provider failure; emergency fallback; rate limit; disabled attachment; references; and truthful acknowledgement wording are captured under <code>output/playwright/atlas-r3-operational-forms/</code>. These deterministic states do not constitute live Brevo verification.</p>
      <p className={styles.warning}><strong>Attachment state:</strong> disabled until approved private storage, signature validation, malware scanning and retention controls exist. <strong>Rate limiter:</strong> process-local; distributed deployment requires an approved shared adapter.</p>
      <p><strong>Reference examples:</strong> <code>AM-PROJ-…</code> · <code>AM-PUB-…</code> · <code>AM-SUP-…</code> · <code>AM-EMG-…</code>.</p>
      <p><strong>Acknowledgement boundaries:</strong> consultation request—not appointment; support delivery—not ticket; emergency delivery—not incident acceptance, engineer assignment or response underway.</p>
      <h3>Operations readiness</h3>
      <div className={styles.captureNote}>
        <p><strong>Brevo selected:</strong> yes · <strong>Sender verified:</strong> no—stored credential rejected</p>
        <p><strong>Logical groups:</strong> General Operations · Publishing Operations · Support Operations · Emergency Duty Operator · Operations Fallback</p>
        <p><strong>Mailbox readiness:</strong> role addresses provisioned; end-to-end receipt and independent emergency/fallback observability unconfirmed</p>
        <p><strong>Emergency monitoring:</strong> Emergency Duty Operator · daily 08:00–22:00 West Africa Time · outside-hours best effort</p>
        <p><strong>Fallback readiness:</strong> alias configured; live fallback receipt unverified</p>
        <p><strong>Deployment topology:</strong> one persistent Node.js instance behind a reverse proxy; not yet provisioned or deployed</p>
        <p><strong>Rate limiter:</strong> process-local; restart clears buckets; horizontal scaling prohibited until an approved shared store exists</p>
        <p><strong>Attachments:</strong> disabled · <strong>Live test:</strong> blocked before sending</p>
        <p><strong>Contact P1:</strong> open · <strong>Emergency P1:</strong> open</p>
      </div>
    </section>
  </main>;
}
