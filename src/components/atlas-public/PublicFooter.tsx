import Link from "next/link";
import { contact } from "@/lib/content";
import styles from "./atlas-public.module.css";

export function PublicFooter() {
  return <footer className={styles.footer}>
    <div className={styles.footerStatement}><span>AIRIX MEDIA</span><h2>Invisible systems.<br/>Visible progress.</h2></div>
    <div className={styles.footerDirectory}>
      <nav aria-label="Legal and policy"><strong>Legal & policy</strong><Link href="/legal">Legal</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/service-terms">Service Terms</Link></nav>
      <nav aria-label="Trust and procurement"><strong>Trust & procurement</strong><Link href="/security">Security</Link><Link href="/data-processing">Data Processing</Link><Link href="/subprocessors">Subprocessors</Link></nav>
      <nav aria-label="Public work"><strong>Public work</strong><Link href="/work">Work</Link><Link href="/open-source">Open Source</Link><a href="https://github.com/thathman" rel="noreferrer">GitHub</a></nav>
      <nav aria-label="Support and contact"><strong>Support & contact</strong><Link href="/contact">Contact</Link><Link href="/support">Support</Link><Link href="/support/emergency">Emergency</Link><a href={contact.portal}>Client Portal</a></nav>
    </div>
    <div className={styles.footerMeta}><span>© {new Date().getFullYear()} Airix Media</span><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{contact.nigeriaPhone}</span></div>
  </footer>;
}
