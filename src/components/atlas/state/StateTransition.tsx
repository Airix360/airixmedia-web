import Link from "next/link";
import type { AtlasStateId } from "@/lib/atlas/types";
import styles from "./atlas-state.module.css";

interface StateTransitionProps {
  from: Extract<AtlasStateId, "edo" | "kaduna" | "plateau" | "ogun">;
  to: Extract<AtlasStateId, "edo" | "kaduna" | "plateau" | "ogun">;
  href: string;
  label: string;
  mode: "road" | "rail" | "path";
}

const stateName: Record<StateTransitionProps["from"], string> = { edo:"Edo State", kaduna:"Kaduna State", plateau:"Plateau State", ogun:"Ogun State" };

export function StateTransition({ from, to, href, label, mode }: StateTransitionProps) {
  return <nav className={styles.transition} data-transition-mode={mode} aria-label="Continue through Atlas">
    <span>{stateName[from]}</span>
    <div aria-hidden="true"><i /><i /><i /></div>
    <Link href={href}><small>{stateName[to]}</small><strong>{label}</strong><b aria-hidden="true">→</b></Link>
  </nav>;
}
