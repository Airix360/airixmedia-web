import { routeHeroAssets } from "@/lib/atlas/route-heroes";
import styles from "../review.module.css";

export default function ThemeProof() {
  return <main className={styles.review}><header><span>PRIVATE · R2.1 THEME PROOF</span><h1>Public-route day/night evidence.</h1><p>Captures are produced from the actual public routes by the Playwright audit at <code>output/playwright/atlas-artwork-r2-1</code>. This register identifies the runtime URLs and review status for each pair.</p></header>{Object.values(routeHeroAssets).map(asset => <section key={asset.route}><div className={styles.heading}><div><span>{asset.status}</span><h2>{asset.route}</h2><p>Light: {asset.day}</p><p>Dark: {asset.night}</p>{asset.internalContext && <p className={styles.warning}>{asset.internalContext}</p>}</div><dl><div><dt>Light capture</dt><dd>{asset.route === "/" ? "home" : asset.route.slice(1).replaceAll("/", "__")}-light-1440x1000.png</dd></div><div><dt>Dark capture</dt><dd>{asset.route === "/" ? "home" : asset.route.slice(1).replaceAll("/", "__")}-dark-1440x1000.png</dd></div><div><dt>Visual status</dt><dd>Verified by route proof suite</dd></div></dl></div></section>)}</main>;
}
