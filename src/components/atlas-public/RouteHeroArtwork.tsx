"use client";

import { useEffect, useState } from "react";
import type { RouteHeroAsset } from "@/lib/atlas/route-heroes";

function resolvedTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function RouteHeroArtwork({ asset, alt, priority = false }: { asset: RouteHeroAsset; alt: string; priority?: boolean }) {
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
  return <img key={`${asset.route}-${theme}`} className="route-hero-artwork" src={src} alt={alt} fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} style={{ objectPosition: asset.mobilePosition }} data-active-hero={src} />;
}
