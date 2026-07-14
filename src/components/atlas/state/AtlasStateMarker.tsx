import Link from "next/link";
import { atlasStateContexts } from "@/content/atlas/states";
import type { AtlasStateId } from "@/lib/atlas/types";
import styles from "./atlas-state.module.css";

interface AtlasStateMarkerProps {
  state: Extract<AtlasStateId, "edo" | "kaduna" | "plateau" | "ogun">;
  page: string;
  identity: string;
}

export function AtlasStateMarker({ state, page, identity }: AtlasStateMarkerProps) {
  const context = atlasStateContexts[state]!;
  return <aside className={styles.marker} data-atlas-state={state} aria-label="Atlas state orientation">
    <div className={styles.path}><span>Airix Atlas</span><i aria-hidden="true" /><strong>{context.name}</strong><i aria-hidden="true" /><b>{page}</b></div>
    <div className={styles.context}><span>{identity}</span><small>{context.orientation}</small></div>
    <Link href="/atlas">Return to the wider Atlas <span aria-hidden="true">↗</span></Link>
  </aside>;
}
