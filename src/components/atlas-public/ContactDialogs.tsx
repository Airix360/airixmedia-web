"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { contact } from "@/lib/content";
import { contactFormDefinitions, contactFormKeys, isContactFormKey, validateContactForm, type ContactField, type ContactFormKey } from "@/lib/contact-forms";
import styles from "./atlas-public.module.css";

type Draft = Record<string, string | boolean>;
type Drafts = Record<ContactFormKey, Draft>;
type SubmissionState = { state: "idle" | "validating" | "sending" | "delivered" | "failure"; message?: string; fallbackUrl?: string };

const cardCopy: Record<ContactFormKey, string> = {
  project: "A qualified brief for websites, systems, infrastructure or custom development.",
  publishing: "OJS, journal platforms, hosting, editorial operations, themes and plugins.",
  book: "Request a consultation with enough context for a useful conversation.",
  general: "Partnerships, institutions, media, vendors, open source and other questions.",
  support: "Record an active technical issue for structured initial triage.",
  emergency: "Keep an unavailable, compromised or publication-blocking system visible.",
};

function blankDraft(type: ContactFormKey): Draft {
  return Object.fromEntries(contactFormDefinitions[type].fields.filter((field) => field.type !== "file").map((field) => [field.name, field.type === "checkbox" ? false : ""]));
}

const initialDrafts = Object.fromEntries(contactFormKeys.map((key) => [key, blankDraft(key)])) as Drafts;

function querySelection() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("form");
  return isContactFormKey(raw) ? { form: raw, service: params.get("service"), source: params.get("source") } : null;
}

export function ContactFormLauncher({ form, service, source, children, className }: { form: ContactFormKey; service?: string; source?: string; children: React.ReactNode; className?: string }) {
  const params = new URLSearchParams({ form });
  if (service) params.set("service", service);
  if (source) params.set("source", source);
  return <Link className={className} href={`/contact?${params.toString()}`}>{children}</Link>;
}

function Field({ field, value, error, onChange }: { field: ContactField; value: string | boolean; error?: string; onChange: (value: string | boolean) => void }) {
  const id = `contact-${field.name}`;
  const hint = field.hint || (field.type === "file" ? "File upload is unavailable until private storage and malware scanning are approved." : "");
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  if (field.type === "checkbox") return <div className={`${styles.dialogField} ${styles.dialogCheckbox} ${field.wide ? styles.dialogWide : ""}`}>
    <label htmlFor={id}><input id={id} name={field.name} type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} aria-invalid={Boolean(error)} aria-describedby={describedBy}/><span>{field.label}</span></label>
    {field.name === "privacyAcknowledgement" && <Link href="/privacy" target="_blank">Open Privacy notice</Link>}
    {error && <span id={`${id}-error`} className={styles.dialogError}>{error}</span>}
  </div>;
  const common = { id, name: field.name, required: field.required, value: String(value ?? ""), onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => onChange(event.target.value), "aria-invalid": Boolean(error), "aria-describedby": describedBy };
  return <label className={`${styles.dialogField} ${field.wide ? styles.dialogWide : ""}`} htmlFor={id}><span>{field.label}{field.required ? " *" : ""}</span>
    {field.type === "textarea" ? <textarea {...common} rows={4}/> : field.type === "select" ? <select {...common}><option value="">Select one</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.type === "file" ? <input id={id} name={field.name} type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt" aria-describedby={describedBy} disabled/> : <input {...common} type={field.type}/>}
    {hint && <small id={`${id}-hint`}>{hint}</small>}
    {error && <span id={`${id}-error`} className={styles.dialogError}>{error}</span>}
  </label>;
}

export function ContactFormDialog({ active, draft, sourceRoute, errors, submission, onChange, onClose, onSubmit }: { active: ContactFormKey | null; draft: Draft; sourceRoute: string; errors: Record<string, string>; submission: SubmissionState; onChange: (name: string, value: string | boolean) => void; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const definition = active ? contactFormDefinitions[active] : null;

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (active && !node.open) {
      node.showModal();
      requestAnimationFrame(() => node.querySelector<HTMLElement>("input:not([type=hidden]):not([type=checkbox]), select, textarea, button")?.focus());
    } else if (!active && node.open) node.close();
  }, [active]);

  useEffect(() => { if (Object.keys(errors).length) errorSummary.current?.focus(); }, [errors]);

  function trap(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
    if (event.key !== "Tab") return;
    const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled])') ?? []).filter((item) => item.offsetParent !== null);
    const first = focusable[0]; const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return <dialog ref={dialog} className={styles.contactDialog} aria-labelledby="contact-dialog-title" aria-describedby="contact-dialog-description" onCancel={(event) => { event.preventDefault(); onClose(); }} onKeyDown={trap}>
    {definition && <div className={styles.dialogShell}>
      <header className={styles.dialogHeader}><div><span>AIRIX MEDIA / {definition.key.toUpperCase()}</span><h2 id="contact-dialog-title">{definition.title}</h2><p id="contact-dialog-description">{definition.description}</p></div><button type="button" onClick={onClose} aria-label={`Close ${definition.title}`}><X size={22}/></button></header>
      <form className={styles.dialogForm} onSubmit={onSubmit} noValidate>
        <input type="hidden" name="selectedForm" value={definition.key}/><input type="hidden" name="sourceRoute" value={sourceRoute}/><label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
        {Object.keys(errors).length > 0 && <div ref={errorSummary} className={styles.dialogErrorSummary} role="alert" tabIndex={-1}><strong>Review the highlighted fields.</strong><ul>{Object.entries(errors).map(([name, message]) => <li key={name}><a href={`#contact-${name}`}>{message}</a></li>)}</ul></div>}
        <div className={styles.dialogGrid}>{definition.fields.map((field) => <Field key={field.name} field={field} value={draft[field.name] ?? (field.type === "checkbox" ? false : "")} error={errors[field.name]} onChange={(value) => onChange(field.name, value)}/>)}</div>
        {active === "support" && draft.severity === "Critical outage" && <p className={styles.emergencyNotice}>This may need the dedicated <Link href="/support/emergency">Emergency Support route</Link>.</p>}
        <div className={styles.dialogActions}><button type="submit" disabled={submission.state === "validating" || submission.state === "sending"}>{submission.state === "validating" ? "Validating…" : submission.state === "sending" ? "Sending…" : active === "book" ? "Request consultation" : "Submit enquiry"}</button><button type="button" onClick={onClose}>Close</button></div>
        <div className={styles.dialogStatus} aria-live="polite">{submission.state === "delivered" && <p>{submission.message}</p>}{submission.state === "failure" && <p><strong>Not sent.</strong> {submission.message} {submission.fallbackUrl ? <a href={submission.fallbackUrl}>Use the published emergency fallback</a> : <a href={`mailto:${contact.email}`}>Continue by email</a>}.</p>}</div>
      </form>
    </div>}
  </dialog>;
}

export function ContactHub() {
  const [active, setActive] = useState<ContactFormKey | null>(null);
  const [drafts, setDrafts] = useState<Drafts>(initialDrafts);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submission, setSubmission] = useState<SubmissionState>({ state: "idle" });
  const [sourceRoute, setSourceRoute] = useState("/contact");
  const launcher = useRef<HTMLButtonElement | null>(null);
  const openedWithPush = useRef(false);

  const draft = useMemo(() => active ? drafts[active] : {}, [active, drafts]);

  useEffect(() => {
    const applyLocation = () => {
      const selected = querySelection();
      setActive(selected?.form ?? null);
      setErrors({}); setSubmission({ state: "idle" });
      if (selected) {
        setSourceRoute(selected.source || document.referrer ? (() => { try { return selected.source || new URL(document.referrer).pathname; } catch { return selected.source || "/contact"; } })() : "/contact");
        if (selected.service && selected.form === "project") setDrafts((current) => ({ ...current, project: { ...current.project, serviceNeeded: selected.service! } }));
      }
      if (!selected) requestAnimationFrame(() => launcher.current?.focus());
    };
    applyLocation();
    window.addEventListener("popstate", applyLocation);
    return () => window.removeEventListener("popstate", applyLocation);
  }, []);

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [active]);

  function open(type: ContactFormKey, button: HTMLButtonElement) {
    launcher.current = button;
    const url = new URL(window.location.href); url.searchParams.set("form", type); url.searchParams.delete("service");
    history.pushState({ contactForm: type }, "", `${url.pathname}${url.search}${url.hash}`);
    openedWithPush.current = true; setSourceRoute("/contact"); setErrors({}); setSubmission({ state: "idle" }); setActive(type);
  }

  function close() {
    if (openedWithPush.current && isContactFormKey(new URLSearchParams(location.search).get("form"))) { openedWithPush.current = false; history.back(); return; }
    const url = new URL(window.location.href); url.searchParams.delete("form"); url.searchParams.delete("service"); url.searchParams.delete("source"); history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setActive(null); setErrors({}); setSubmission({ state: "idle" }); requestAnimationFrame(() => launcher.current?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!active) return;
    const result = validateContactForm(active, { ...draft, sourceRoute });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) if (issue.path[0] && !next[String(issue.path[0])]) next[String(issue.path[0])] = issue.message;
      setErrors(next); setSubmission({ state: "idle" }); return;
    }
    setErrors({}); setSubmission({ state: "validating" });
    const payload = new FormData(event.currentTarget);
    for (const [name, value] of Object.entries(draft)) { payload.delete(name); if (typeof value === "boolean") { if (value) payload.set(name, "true"); } else payload.set(name, value); }
    setSubmission({ state: "sending" });
    try {
      const response = await fetch("/api/leads", { method: "POST", body: payload, headers: { Accept: "application/json" } });
      const body = await response.json() as { ok?: boolean; error?: string; reference?: string; message?: string; fallbackMessage?: string; fallbackUrl?: string; fields?: Record<string, string[]> };
      if (!response.ok || !body.ok) {
        if (body.fields) setErrors(Object.fromEntries(Object.entries(body.fields).flatMap(([name, messages]) => messages?.[0] ? [[name, messages[0]]] : [])));
        setSubmission({ state: "failure", message: [body.error || "The submission provider is unavailable.", body.fallbackMessage].filter(Boolean).join(" "), fallbackUrl: body.fallbackUrl }); return;
      }
      setSubmission({ state: "delivered", message: body.message || (body.reference ? `Reference ${body.reference}.` : "The configured provider accepted it.") });
    } catch { setSubmission({ state: "failure", message: "The submission provider could not be reached." }); }
  }

  return <section id="contact-options" className={styles.contactHub} aria-labelledby="contact-options-title">
    <div className={styles.contactHubIntro}><span className={styles.kicker}>SIX PURPOSE-SPECIFIC ROUTES</span><h2 id="contact-options-title">Choose the right starting point.</h2><p>Forms retain your entries while they are closed during this visit. Online submission remains explicit about provider availability.</p></div>
    <div className={styles.contactCards}>{contactFormKeys.map((key, index) => <button type="button" key={key} onClick={(event) => open(key, event.currentTarget)} data-contact-launcher={key}><span>0{index + 1}</span><div><strong>{contactFormDefinitions[key].title}</strong><p>{cardCopy[key]}</p></div><ArrowRight aria-hidden="true" size={20}/></button>)}</div>
    <p className={styles.contactDirect}>Verified direct channel: <a href={`mailto:${contact.email}`}>{contact.email}</a>. Existing clients can use the <a href={contact.portal}>Client Portal</a>.</p>
    <ContactFormDialog active={active} draft={draft} sourceRoute={sourceRoute} errors={errors} submission={submission} onChange={(name, value) => active && setDrafts((current) => ({ ...current, [active]: { ...current[active], [name]: value } }))} onClose={close} onSubmit={submit}/>
  </section>;
}
