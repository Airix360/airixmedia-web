"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { PublicRouteHeroAsset } from "@/lib/atlas/route-heroes";
import styles from "./atlas-public.module.css";

function resolvedTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function RouteHeroArtwork({ asset, alt, priority = false, variant = "hero" }: { asset: PublicRouteHeroAsset; alt: string; priority?: boolean; variant?: "hero" | "section" }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const update = () => setTheme(resolvedTheme());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (!theme) return <div aria-hidden="true" />;
  const src = theme === "dark" ? asset.night : asset.day;
  const position = { "--route-hero-desktop-position": asset.desktopPosition, "--route-hero-mobile-position": asset.mobilePosition } as CSSProperties;
  return <img key={`${asset.route}-${theme}`} className={variant === "section" ? styles.routeSectionArtwork : styles.routeHeroArtwork} src={src} alt={alt} fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} style={position} data-active-hero={src} />;
}
