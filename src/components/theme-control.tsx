"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeChoice = "auto" | "light" | "dark";
type ActiveTheme = Exclude<ThemeChoice, "auto">;

export function themeAt(date = new Date()): ActiveTheme {
  const hour = date.getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

export function nextThemeBoundary(date = new Date()) {
  const next = new Date(date);
  const hour = date.getHours();
  next.setHours(hour < 6 ? 6 : hour < 18 ? 18 : 6, 0, 0, 0);
  if (hour >= 18) next.setDate(next.getDate() + 1);
  return next;
}

function savedChoice(): ThemeChoice {
  const saved = localStorage.getItem("airix-theme");
  return saved === "light" || saved === "dark" ? saved : "auto";
}

export function ThemeControl({ className = "", expanded = false }: { className?: string; expanded?: boolean }) {
  const [choice, setChoice] = useState<ThemeChoice>("auto");
  const [active, setActive] = useState<ActiveTheme>("light");
  const [announcement, setAnnouncement] = useState("");
  const [ready, setReady] = useState(false);

  const apply = (next: ActiveTheme) => {
    document.documentElement.setAttribute("data-theme", next);
    setActive(next);
  };

  useEffect(() => {
    const current = savedChoice();
    queueMicrotask(() => { setChoice(current); apply(current === "auto" ? themeAt() : current); setReady(true); });
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (choice !== "auto") {
      queueMicrotask(() => apply(choice));
      return;
    }
    const evaluate = () => apply(themeAt());
    queueMicrotask(evaluate);
    let timer = 0;
    const schedule = () => {
      const delay = Math.max(0, nextThemeBoundary().getTime() - Date.now()) + 25;
      timer = window.setTimeout(() => { evaluate(); schedule(); }, delay);
    };
    schedule();
    const onVisible = () => { if (document.visibilityState === "visible") evaluate(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { window.clearTimeout(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, [choice, ready]);

  function choose(next: ActiveTheme) {
    localStorage.setItem("airix-theme", next);
    setChoice(next);
    apply(next);
    setAnnouncement(`${next === "dark" ? "Dark" : "Light"} theme selected.`);
  }

  function useAutomaticTheme() {
    localStorage.removeItem("airix-theme");
    setChoice("auto");
    const next = themeAt();
    apply(next);
    setAnnouncement(`Automatic theme restored. ${next === "dark" ? "Dark" : "Light"} theme active.`);
  }

  const switchTo = active === "dark" ? "light" : "dark";
  return <div className={`${className} theme-control ${expanded ? "theme-control-expanded" : ""}`}>
    <button type="button" className="theme-switch" role="switch" aria-checked={active === "dark"} aria-label={`Switch to ${switchTo} mode`} onClick={() => choose(switchTo)}>
      <span className="theme-switch-label theme-switch-light">Light</span><Sun aria-hidden="true" size={15}/><span className="theme-switch-thumb"/><Moon aria-hidden="true" size={15}/><span className="theme-switch-label theme-switch-dark">Dark</span>
    </button>
    {expanded && choice !== "auto" && <button type="button" className="automatic-theme" onClick={useAutomaticTheme}>Use automatic theme</button>}
    <span className="sr-only" aria-live="polite">{announcement}</span>
  </div>;
}
