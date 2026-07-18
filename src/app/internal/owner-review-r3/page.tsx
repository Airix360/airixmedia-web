import Image from "next/image";
import { r3Wave1Review, r3Wave1SharedDecisions } from "@/lib/atlas/r3-wave1";
import { r3Wave2Decision, r3Wave2Review } from "@/lib/atlas/r3-wave2";
import styles from "../owner-review-r2/review.module.css";

const wave2Captures = [
  ["Desktop Light", "desktop-light.png", 1440, 1000],
  ["Desktop Dark", "desktop-dark.png", 1440, 1000],
  ["Tablet Light", "tablet-light.png", 768, 1024],
  ["390px Light", "mobile-390-light.png", 390, 844],
  ["390px Dark", "mobile-390-dark.png", 390, 844],
  ["360px Light", "mobile-360-light.png", 360, 800],
] as const;

export default function OwnerReviewR3() {
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
  </main>;
}
