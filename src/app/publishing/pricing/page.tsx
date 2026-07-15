import Link from "next/link";
import { PublicArtwork } from "@/components/atlas-public/PublicArtwork";
import { PublicFooter } from "@/components/atlas-public/PublicFooter";
import { PublicHeader } from "@/components/atlas-public/PublicHeader";
import { publishingPrices } from "@/content/atlas/public";
import styles from "@/components/atlas-public/atlas-public.module.css";

export default function Page() {
  return <div className={`${styles.site} ${styles.state_oyo}`}>
    <PublicHeader />
    <main id="main-content">
      <header className={styles.pageHero}>
        <PublicArtwork id="oyo-publishing" alt="Ibadan hills, university publishing courtyard, library and print room" priority />
        <div className={styles.heroScrim} />
        <div className={styles.pageHeroCopy}>
          <span className={styles.routeLabel}>AIRIX ATLAS / OYO / PRICING</span>
          <span className={styles.kicker}>OJS PRICING</span>
          <h1>A clear starting point. A proposal remains authoritative.</h1>
          <p>All public prices begin with “From”. Scope, billing country, platform condition and support requirements determine the final proposal.</p>
        </div>
      </header>
      <section className={styles.repositoryList}>
        <span className={styles.kicker}>OWNER-CONFIRMED STARTING AMOUNTS</span>
        <h2>Publishing services.</h2>
        {publishingPrices.map(([name, price], index) => <div className={styles.priceRow} key={name}><span>0{index + 1}</span><strong>{name}</strong><b>{price}</b></div>)}
        <p>No response-time promise is attached to these prices. Non-OJS pricing remains unpublished until separately verified.</p>
        <Link className={styles.primaryAction} href="/discuss">Request a scoped proposal</Link>
      </section>
    </main>
    <PublicFooter />
  </div>;
}
