import Link from "next/link";
import type { AtlasStateId } from "@/lib/atlas/types";
import styles from "./atlas-state.module.css";

interface StateTransitionProps {
  from: Extract<AtlasStateId, "edo" | "kaduna">;
  to: Extract<AtlasStateId, "edo" | "kaduna">;
  href: string;
  label: string;
  mode: "road" | "rail";
}

export function StateTransition({ from, to, href, label, mode }: StateTransitionProps) {
  return <nav className={styles.transition} data-transition-mode={mode} aria-label="Continue through Atlas">
    <span>{from === "edo" ? "Edo State" : "Kaduna State"}</span>
    <div aria-hidden="true"><i /><i /><i /></div>
    <Link href={href}><small>{to === "edo" ? "Edo State" : "Kaduna State"}</small><strong>{label}</strong><b aria-hidden="true">→</b></Link>
  </nav>;
}
