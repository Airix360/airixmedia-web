"use client";

import { FormEvent, useRef, useState } from "react";
import { contact } from "@/lib/content";
import styles from "./atlas-public.module.css";

export function LocalBrief({ contactMode = false }: { contactMode?: boolean }) {
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const errorSummary = useRef<HTMLDivElement>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const required = ["organisation", "name", "email", "challenge"];
    const nextErrors = Object.fromEntries(required.flatMap((name) => String(data.get(name) ?? "").trim() ? [] : [[name, "This field is required."]]));
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    const challenge = String(data.get("challenge") ?? "").trim();
    if (challenge && challenge.length < 20) nextErrors.challenge = "Use at least 20 characters so the context is useful.";
    if (Object.keys(nextErrors).length) {
      setSummary("");
      setErrors(nextErrors);
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }
    setErrors({});
    const lines = Array.from(data.entries()).filter(([, value]) => String(value).trim()).map(([key, value]) => `${key.replaceAll("-", " ")}: ${value}`);
    setSummary(lines.join("\n"));
  }
  return <section id={contactMode ? "contact-summary" : "project-brief"} className={styles.formSection} aria-labelledby="brief-title">
    <div><span className={styles.kicker}>LOCAL PREPARATION TOOL</span><h2 id="brief-title">{contactMode ? "Prepare your message." : "Build the first useful brief."}</h2><p>Nothing is transmitted from this form. It creates a local summary you can copy into a verified channel.</p></div>
    <form onSubmit={prepare} noValidate>
      {Object.keys(errors).length > 0 && <div className={styles.formErrors} role="alert" tabIndex={-1} ref={errorSummary}><strong>Review the highlighted fields.</strong><ul>{Object.entries(errors).map(([name, message]) => <li key={name}><a href={`#brief-${name}`}>{message}</a></li>)}</ul></div>}
      <label htmlFor="brief-organisation">Organisation<input id="brief-organisation" name="organisation" autoComplete="organization" aria-invalid={Boolean(errors.organisation)} aria-describedby={errors.organisation ? "brief-organisation-error" : undefined}/>{errors.organisation && <span id="brief-organisation-error" className={styles.fieldError}>{errors.organisation}</span>}</label>
      <label htmlFor="brief-name">Your name<input id="brief-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "brief-name-error" : undefined}/>{errors.name && <span id="brief-name-error" className={styles.fieldError}>{errors.name}</span>}</label>
      <label htmlFor="brief-email">Email<input id="brief-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "brief-email-error" : undefined}/>{errors.email && <span id="brief-email-error" className={styles.fieldError}>{errors.email}</span>}</label>
      <label>Primary route<select name="service" defaultValue=""><option value="" disabled>Choose one</option><option>Website or digital experience</option><option>Business system or portal</option><option>Publishing or OJS</option><option>Infrastructure or support</option><option>Emergency recovery</option><option>Not sure yet</option></select></label>
      <label className={styles.formWide} htmlFor="brief-challenge">What needs to work better?<textarea id="brief-challenge" name="challenge" rows={5} aria-invalid={Boolean(errors.challenge)} aria-describedby={errors.challenge ? "brief-challenge-error" : undefined}/>{errors.challenge && <span id="brief-challenge-error" className={styles.fieldError}>{errors.challenge}</span>}</label>
      {!contactMode && <><label>Launch window<input name="launch-window" placeholder="For example: this quarter"/></label><label>Billing country<input name="billing-country" autoComplete="country-name"/></label></>}
      <button type="submit">Prepare local summary</button>
    </form>
    {summary && <div className={styles.localSummary} role="status"><strong>Prepared locally — not sent</strong><pre>{summary}</pre><div><a href={`mailto:${contact.email}?subject=Airix%20project%20enquiry&body=${encodeURIComponent(summary)}`}>Continue in email</a><a href={`https://wa.me/${contact.nigeriaWhatsApp}?text=${encodeURIComponent(summary)}`}>Continue in WhatsApp</a></div></div>}
  </section>;
}
