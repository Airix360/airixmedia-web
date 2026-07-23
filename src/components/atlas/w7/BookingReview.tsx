import Link from "next/link";
import { W7ReviewShell } from "./W7ReviewShell";
import { BookingReviewForm } from "./ReviewForms";
import type { AtlasSceneAsset } from "@/lib/atlas/types";
import styles from "./atlas-w7.module.css";
export function BookingReview({ scene, auditMode = false }: { scene: AtlasSceneAsset; auditMode?: boolean }) {
  return (
    <W7ReviewShell
      scene={scene}
      state="ogun"
      page="Book"
      identity="Preparation Register"
      kind="booking"
      title="Prepare the conversation before choosing a time."
      body="W7 models meeting purpose, project stage, time zone, timing, and preparation without claiming a provider or publishing fake availability."
      skip="booking-preparation"
      auditMode={auditMode}
    >
      <section
        className={styles.section}
        id="booking-preparation"
        tabIndex={-1}
      >
        <header>
          <span>Booking preparation</span>
          <h2>No calendar is connected.</h2>
          <p>
            This is a local review of fields and validation. It creates no
            appointment, hold, reference, notification, or scheduler request.
          </p>
        </header>
        <BookingReviewForm />
      </section>
      <section className={styles.section} data-tone="dark">
        <header>
          <span>Future handoff</span>
          <h2>Availability must be real.</h2>
          <p>
            A future integration needs an approved provider, endpoint, time-zone
            rules, host ownership, duration, buffers, cancellation and
            rescheduling policy, privacy terms, consent, retention, abuse
            prevention, failure handling, and a verified fallback.
          </p>
        </header>
        <div className={styles.linkRow}>
          <Link href="/start-a-project">
            Submit a public project brief first
          </Link>
          <Link href="/contact">Use public Contact</Link>
        </div>
      </section>
    </W7ReviewShell>
  );
}
