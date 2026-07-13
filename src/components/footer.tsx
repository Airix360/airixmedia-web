import Link from "next/link";
import { contact, copy, type Locale } from "@/lib/content";

const routeFor = (locale: Locale, path: string) => locale === "en" ? path : `/${locale}${path}`;

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div><h3>AIRIX MEDIA</h3><p className="section-copy">A boutique creative technology studio and digital operations partner. Part of Airix 360.</p><p>{t.footer}</p></div>
          <div><h3>Practices</h3><nav><Link href={routeFor(locale, "/services/digital-experiences")}>Digital Experiences</Link><Link href={routeFor(locale, "/services/business-systems")}>Business Systems</Link><Link href={routeFor(locale, "/publishing")}>Publishing Technology</Link><Link href={routeFor(locale, "/services/managed-infrastructure")}>Managed Infrastructure</Link></nav></div>
          <div><h3>Company</h3><nav><Link href={routeFor(locale, "/systems")}>Selected Systems</Link><Link href={routeFor(locale, "/open-source")}>Open Source</Link><Link href={routeFor(locale, "/insights")}>Insights</Link><Link href={routeFor(locale, "/company")}>Company</Link></nav></div>
          <div><h3>Trust</h3><nav><Link href={routeFor(locale, "/support")}>Support</Link><Link href={routeFor(locale, "/security")}>Security</Link><Link href={routeFor(locale, "/service-levels")}>Service levels</Link><Link href={routeFor(locale, "/legal")}>Legal centre</Link></nav></div>
        </div>
        <div className="footer-meta"><span>© {new Date().getFullYear()} Airix Media</span><span>{contact.email} · {contact.nigeriaPhone}</span></div>
      </div>
    </footer>
  );
}
