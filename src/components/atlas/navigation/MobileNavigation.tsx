"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { atlasDistrictNames, atlasPrimaryNavigation, atlasUtilityNavigation } from "@/content/atlas/navigation";
import type { AtlasDistrictId } from "@/lib/atlas/types";
import { PortalAccess } from "./PortalAccess";
import styles from "./atlas-navigation.module.css";

export function MobileNavigation({ activeDistrict }: { activeDistrict: AtlasDistrictId }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const first = panel.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = [...panel.current.querySelectorAll<HTMLElement>("a, button")];
      const firstItem = focusable[0]; const lastItem = focusable.at(-1);
      if (event.shiftKey && document.activeElement === firstItem) { event.preventDefault(); lastItem?.focus(); }
      if (!event.shiftKey && document.activeElement === lastItem) { event.preventDefault(); firstItem?.focus(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={styles.mobileNavigation}>
      <button ref={trigger} className={styles.menuTrigger} type="button" aria-expanded={open} aria-controls="atlas-mobile-menu" onClick={() => setOpen((value) => !value)}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}<span>{open ? "Close" : "Menu"}</span>
      </button>
      {open ? <div ref={panel} className={styles.mobileSheet} id="atlas-mobile-menu" role="dialog" aria-modal="true" aria-label="Atlas navigation">
        <div className={styles.sheetLocation}><span>Current location</span><strong>{atlasDistrictNames[activeDistrict]}</strong></div>
        <nav aria-label="Mobile primary navigation">
          {atlasPrimaryNavigation.map((item) => <Link key={item.label} href={item.href} data-priority={item.priority} aria-current={item.district === activeDistrict ? "page" : undefined} onClick={() => setOpen(false)}><span>{item.label}</span><small>{atlasDistrictNames[item.district]}</small></Link>)}
        </nav>
        <div className={styles.mobileUtilities}>
          <Link href={atlasUtilityNavigation[0].href} onClick={() => setOpen(false)}>Emergency Support</Link>
          <Link href={atlasUtilityNavigation[2].href} onClick={() => setOpen(false)}>Contact</Link>
          <PortalAccess compact />
        </div>
      </div> : null}
    </div>
  );
}
