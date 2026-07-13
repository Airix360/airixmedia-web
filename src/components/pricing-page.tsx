import { headers } from "next/headers";
import { Check } from "lucide-react";
import { Footer } from "./footer";
import { Header } from "./header";
import { visiblePricing, regionForCountry, type PricingPackage } from "@/lib/pricing";
import type { Locale } from "@/lib/content";

const labels = {
  en: { eyebrow: "PUBLISHING PRICING", title: "Clear starting points for standard OJS work.", summary: "Public prices qualify the starting point. Access, condition, integrations, migration complexity, and billing country determine the final proposal.", from: "Starting from", annual: "per year", one: "one-time", estimate: "Prototype regional estimate" },
  fr: { eyebrow: "TARIFS DE PUBLICATION", title: "Des points de départ clairs pour les services OJS standard.", summary: "Les tarifs publics qualifient le point de départ. L’accès, l’état du système, les intégrations, la migration et le pays de facturation déterminent la proposition finale.", from: "À partir de", annual: "par an", one: "paiement unique", estimate: "Estimation régionale du prototype" },
  pt: { eyebrow: "PREÇOS DE PUBLICAÇÃO", title: "Pontos de partida claros para serviços OJS padrão.", summary: "Os preços públicos qualificam o ponto de partida. Acesso, estado, integrações, migração e país de faturação determinam a proposta final.", from: "A partir de", annual: "por ano", one: "pagamento único", estimate: "Estimativa regional do protótipo" },
};

function displayPrice(item: PricingPackage, region: ReturnType<typeof regionForCountry>, locale: Locale) {
  if (region === "nigeria" || region === "africa") return { value: new Intl.NumberFormat(locale === "fr" ? "fr-FR" : locale === "pt" ? "pt-PT" : "en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(item.amount), estimated: region !== "nigeria" };
  const divisor = region === "europe" ? Number(process.env.FX_NGN_EUR ?? 1800) : Number(process.env.FX_NGN_USD ?? 1600);
  const currency = region === "europe" ? "EUR" : "USD";
  return { value: new Intl.NumberFormat(locale === "fr" ? "fr-FR" : locale === "pt" ? "pt-PT" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(Math.ceil(item.amount / divisor / 10) * 10), estimated: true };
}

export async function PricingPage({ locale = "en" }: { locale?: Locale }) {
  const incoming = await headers();
  const country = incoming.get("cf-ipcountry") ?? incoming.get("x-vercel-ip-country");
  const region = regionForCountry(country);
  const t = labels[locale];
  return <><Header locale={locale} /><main id="main-content"><header className="page-hero"><div className="shell"><span className="mono">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.summary}</p><span className="verification">REGION · {region.toUpperCase()} · FINAL QUOTE CONTROLS BILLING</span></div></header><section className="section"><div className="shell case-grid">{visiblePricing().map((item) => { const display = displayPrice(item, region, locale); return <article className="case-item" key={item.slug}><div><span className="mono">{item.audience}</span><h2>{item.name}</h2><p>{t.from}</p><strong style={{ fontSize: "2.2rem" }}>{display.value}</strong><p className="mono">{item.billingPeriod === "annual" ? t.annual : t.one}{display.estimated ? ` · ${t.estimate}` : ""}</p></div><div className="detail-list">{item.included.map((line) => <div key={line}><Check size={15} aria-hidden="true" /> {line}</div>)}</div></article>; })}</div><p className="section-copy">Prices do not create an online purchase or binding quote. Deposits, staged payments, support coverage, renewal, currency, and delivery timing are confirmed in the proposal.</p></section></main><Footer locale={locale} /></>;
}
