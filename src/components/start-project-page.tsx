import { Header } from "./header";
import { Footer } from "./footer";
import { ProjectSelector } from "./project-selector";
import type { Locale } from "@/lib/content";

const intros = {
  en: { label: "QUALIFIED PROJECT BRIEF", title: "Start with enough context to make the next step useful.", body: "This selector provides a preliminary recommendation. It does not create a binding quote, timeline, or service commitment." },
  fr: { label: "BRIEF DE PROJET QUALIFIÉ", title: "Commencez avec assez de contexte pour rendre la prochaine étape utile.", body: "Ce sélecteur fournit une recommandation préliminaire. Il ne crée ni devis, ni délai, ni engagement de service contraignant." },
  pt: { label: "BRIEFING DE PROJETO QUALIFICADO", title: "Comece com contexto suficiente para tornar o próximo passo útil.", body: "Este seletor fornece uma recomendação preliminar. Não cria um orçamento, prazo ou compromisso de serviço vinculativo." },
};
export function StartProjectPage({ locale = "en" }: { locale?: Locale }) { const t = intros[locale]; return <><Header locale={locale} /><main id="main-content"><header className="page-hero"><div className="shell"><span className="mono">{t.label}</span><h1>{t.title}</h1><p>{t.body}</p></div></header><section className="section"><div className="shell"><ProjectSelector locale={locale} /></div></section></main><Footer locale={locale} /></>; }
