import Link from "next/link";
import { W7ReviewShell } from "./W7ReviewShell";
import { ContactReviewForm } from "./ReviewForms";
import { verifiedContact } from "@/content/atlas/w7";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import styles from "./atlas-w7.module.css";
export function ContactReview({ scene, auditMode = false }: { scene: AtlasSceneAsset; auditMode?: boolean }) {
  return (
    <W7ReviewShell
      scene={scene}
      state="ogun"
      page="Contact"
      identity="Meeting Court"
      kind="contact"
      title="A direct route to the right conversation."
      body="General, project, publishing, and carefully qualified collaboration enquiries begin with verified channels and clear expectations."
      skip="contact-route"
      auditMode={auditMode}
    >
      <section
        className={styles.section}
        id="contact-route"
        tabIndex={-1}
        data-tone="stone"
      >
        <header>
          <span>Contact route</span>
          <h2>Preview the enquiry locally.</h2>
          <p>
            The form validates only in this browser. It never calls the existing
            lead API, sends email, writes storage, or displays fake success.
          </p>
        </header>
        <ContactReviewForm />
      </section>
      <section className={styles.section} data-tone="dark">
        <header>
          <span>Verified methods</span>
          <h2>Use only what is recorded.</h2>
          <p>
            No address, office, opening hours, response time, availability
            promise, or countries-of-operation claim is added.
          </p>
        </header>
        <ol className={styles.ledger}>
          <li>
            <small>Email · verified repository record</small>
            <h3>{verifiedContact.email}</h3>
            <p>
              <a href={`mailto:${verifiedContact.email}`}>
                Open email client ↗
              </a>
            </p>
          </li>
          <li>
            <small>Phone and WhatsApp · verified repository record</small>
            <h3>{verifiedContact.nigeriaPhone}</h3>
            <p>
              <a href={verifiedContact.nigeriaWhatsApp}>
                Open Nigerian WhatsApp ↗
              </a>
            </p>
          </li>
          <li>
            <small>Existing clients</small>
            <h3>Client Portal</h3>
            <p>
              <a href={verifiedContact.portal}>Open portal ↗</a>
            </p>
          </li>
        </ol>
        <div className={styles.linkRow}>
          <Link href="/support/emergency">
            Production emergency? Go directly to Emergency Recovery
          </Link>
        </div>
      </section>
    </W7ReviewShell>
  );
}
