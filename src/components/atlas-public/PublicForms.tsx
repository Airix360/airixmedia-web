"use client";

import { FormEvent, useState } from "react";
import { contact } from "@/lib/content";
import styles from "./atlas-public.module.css";

export function LocalBrief({ contactMode = false }: { contactMode?: boolean }) {
  const [summary, setSummary] = useState("");
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = Array.from(data.entries()).filter(([, value]) => String(value).trim()).map(([key, value]) => `${key.replaceAll("-", " ")}: ${value}`);
    setSummary(lines.join("\n"));
  }
  return <section id={contactMode ? "contact-summary" : "project-brief"} className={styles.formSection} aria-labelledby="brief-title">
    <div><span className={styles.kicker}>LOCAL PREPARATION TOOL</span><h2 id="brief-title">{contactMode ? "Prepare your message." : "Build the first useful brief."}</h2><p>Nothing is transmitted from this form. It creates a local summary you can copy into a verified channel.</p></div>
    <form onSubmit={prepare}>
      <label>Organisation<input name="organisation" autoComplete="organization" required/></label>
      <label>Your name<input name="name" autoComplete="name" required/></label>
      <label>Email<input name="email" type="email" autoComplete="email" required/></label>
      <label>Primary route<select name="service" defaultValue=""><option value="" disabled>Choose one</option><option>Website or digital experience</option><option>Business system or portal</option><option>Publishing or OJS</option><option>Infrastructure or support</option><option>Emergency recovery</option><option>Not sure yet</option></select></label>
      <label className={styles.formWide}>What needs to work better?<textarea name="challenge" rows={5} minLength={20} required/></label>
      {!contactMode && <><label>Launch window<input name="launch-window" placeholder="For example: this quarter"/></label><label>Billing country<input name="billing-country" autoComplete="country-name"/></label></>}
      <button type="submit">Prepare local summary</button>
    </form>
    {summary && <div className={styles.localSummary} role="status"><strong>Prepared locally — not sent</strong><pre>{summary}</pre><div><a href={`mailto:${contact.email}?subject=Airix%20project%20enquiry&body=${encodeURIComponent(summary)}`}>Continue in email</a><a href={`https://wa.me/${contact.nigeriaWhatsApp}?text=${encodeURIComponent(summary)}`}>Continue in WhatsApp</a></div></div>}
  </section>;
}

