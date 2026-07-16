"use client";

import { useEffect, useState } from "react";

type ThemeChoice = "auto" | "light" | "dark";

function autoTheme() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

export function ThemeControl({ className = "" }: { className?: string }) {
  const [choice, setChoice] = useState<ThemeChoice>(() => {
    if (typeof window === "undefined") return "auto";
    const saved = localStorage.getItem("airix-theme");
    return saved === "light" || saved === "dark" ? saved : "auto";
  });
  useEffect(() => {
    const saved = localStorage.getItem("airix-theme") as ThemeChoice | null;
    const apply = () => document.documentElement.setAttribute("data-theme", saved === "light" || saved === "dark" ? saved : autoTheme());
    apply();
    const onVisible = () => { if (document.visibilityState === "visible" && (saved !== "light" && saved !== "dark")) apply(); };
    document.addEventListener("visibilitychange", onVisible);
    const timer = window.setInterval(() => { if (saved !== "light" && saved !== "dark") apply(); }, 60_000);
    return () => { document.removeEventListener("visibilitychange", onVisible); window.clearInterval(timer); };
  }, []);
  function change(next: ThemeChoice) {
    setChoice(next);
    if (next === "auto") localStorage.removeItem("airix-theme"); else localStorage.setItem("airix-theme", next);
    document.documentElement.setAttribute("data-theme", next === "auto" ? autoTheme() : next);
  }
  return <label className={className}><span className="sr-only">Appearance</span><select aria-label="Appearance" value={choice} onChange={(event) => change(event.target.value as ThemeChoice)}><option value="auto">Auto</option><option value="light">Light</option><option value="dark">Dark</option></select></label>;
}
