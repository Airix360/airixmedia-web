import Link from "next/link";
import { PrimaryNavigation } from "@/components/atlas/navigation";
import { AtlasScene } from "@/components/atlas/scene";
import { AtlasStateMarker, StateTransition } from "@/components/atlas/state";
import { SkipJourneyLink } from "@/components/atlas/accessibility";
import type {
  AtlasSceneAsset,
  AtlasStateId,
  AtlasDistrictId,
} from "@/lib/atlas/types";
import styles from "./atlas-w7.module.css";
import auditStyles from "@/components/atlas/state/state-audit.module.css";

export function W7ReviewShell({
  scene,
  state,
  page,
  identity,
  kind,
  title,
  body,
  skip,
  auditMode = false,
  children,
}: {
  scene: AtlasSceneAsset;
  state: Extract<AtlasStateId, "plateau" | "ogun">;
  page: string;
  identity: string;
  kind: string;
  title: string;
  body: string;
  skip: string;
  auditMode?: boolean;
  children: React.ReactNode;
}) {
  const district: AtlasDistrictId =
    state === "plateau" ? "observatory" : "gateway";
  return (
    <div
      className={`${styles.page} ${auditMode ? auditStyles.hidden : ""}`}
      data-w7-review={kind}
      data-state={state}
      data-state-audit={auditMode ? "hidden-labels" : "labelled"}
    >
      <SkipJourneyLink href={`#${skip}`} label={`Skip to ${page} content`} />
      <PrimaryNavigation activeDistrict={district} />
      <div className={styles.review}>
        <strong>Private W7 review</strong>
        <span>
          Candidate {state === "plateau" ? "Plateau" : "Ogun"} artwork
        </span>
        <span>Internal review — no information is transmitted.</span>
      </div>
      <main>
        <AtlasStateMarker state={state} page={page} identity={identity} />
        <section
          className={styles.arrival}
          data-kind={kind}
          aria-labelledby={`${kind}-title`}
        >
          <AtlasScene
            scene={scene}
            mode="static"
            priority
            className={styles.scene}
          />
          <span className={styles.candidate}>
            Candidate art · private review
          </span>
          <div className={styles.copy}>
            <span>{page} · proposed internal copy</span>
            <h1 id={`${kind}-title`}>{title}</h1>
            <p>{body}</p>
            <a href={`#${skip}`}>Enter the working surface ↓</a>
          </div>
        </section>
        {children}
        <StateTransition
          from={state}
          to={state === "plateau" ? "ogun" : "plateau"}
          href={
            state === "plateau"
              ? "/internal/atlas-gateway"
              : "/internal/atlas-observatory"
          }
          label={
            state === "plateau"
              ? "Discuss a Project · Project Gateway"
              : "Atlas · Observatory"
          }
          mode={state === "plateau" ? "rail" : "path"}
        />
      </main>
      <footer className={styles.footer}>
        <span>Airix Atlas · W7 private review</span>
        <Link href="/atlas">Return to public Atlas</Link>
      </footer>
    </div>
  );
}
