import Link from "next/link";
import { contact } from "@/lib/content";
import styles from "./atlas-public.module.css";

export function PublicFooter() {
  return <footer className={styles.footer}>
    <div className={styles.footerStatement}><span>AIRIX MEDIA</span><h2>Invisible systems.<br/>Visible progress.</h2></div>
    <div className={styles.footerDirectory}>
      <nav aria-label="Services"><strong>Build</strong><Link href="/services/digital-experiences">Digital Experiences</Link><Link href="/services/business-systems">Business Systems</Link><Link href="/publishing">Publishing</Link></nav>
      <nav aria-label="Operations"><strong>Run & Rescue</strong><Link href="/services/managed-infrastructure">Infrastructure</Link><Link href="/support">Support</Link><Link href="/support/emergency">Emergency</Link></nav>
      <nav aria-label="Explore"><strong>Explore</strong><Link href="/work">Work</Link><Link href="/atlas">Atlas</Link><Link href="/studio">Studio</Link><Link href="/open-source">Open Source</Link></nav>
      <nav aria-label="Information"><strong>Information</strong><Link href="/security">Security</Link><Link href="/service-levels">Service Levels</Link><Link href="/legal">Legal</Link><a href={contact.portal}>Client Portal</a></nav>
    </div>
    <div className={styles.footerMeta}><span>© {new Date().getFullYear()} Airix Media</span><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{contact.nigeriaPhone}</span></div>
  </footer>;
}
