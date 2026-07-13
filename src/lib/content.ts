import { z } from "zod";

export const evidenceStateSchema = z.enum([
  "verified",
  "owner_confirmed",
  "inferred_needs_review",
  "placeholder",
  "do_not_publish",
]);

export type EvidenceState = z.infer<typeof evidenceStateSchema>;

export const practiceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  promise: z.string(),
  accent: z.enum(["blue", "orange", "green", "violet", "red"]),
  services: z.array(z.string()),
});

export type Practice = z.infer<typeof practiceSchema>;

export const practices: Practice[] = [
  {
    slug: "digital-experiences",
    name: "Digital Experiences",
    summary: "Websites and commerce systems that make complex organisations easier to understand and use.",
    promise: "Make the first interaction clear, fast, and useful.",
    accent: "blue",
    services: ["Website strategy", "UX and interface design", "E-commerce", "SEO and content", "Accessibility", "Performance optimisation"],
  },
  {
    slug: "business-systems",
    name: "Business Systems",
    summary: "Applications, portals, automations, and integrations that move work through your organisation.",
    promise: "Turn repeated manual work into a system people can trust.",
    accent: "orange",
    services: ["Custom applications", "Client and staff portals", "Workflow automation", "API and payment integrations", "Data migration", "AI-assisted systems"],
  },
  {
    slug: "publishing",
    name: "Publishing Technology",
    summary: "Specialist OJS systems, journal infrastructure, and publishing operations.",
    promise: "African journals deserve world-class publishing infrastructure.",
    accent: "green",
    services: ["OJS platforms", "Multi-journal systems", "Themes and plugins", "Upgrades and migrations", "Hosting and maintenance", "Editorial operations"],
  },
  {
    slug: "managed-infrastructure",
    name: "Managed Infrastructure",
    summary: "Hosting, servers, domains, email, security, and monitoring managed as one operating layer.",
    promise: "Keep the foundation stable while the organisation moves forward.",
    accent: "violet",
    services: ["Managed hosting", "Cloud and VPS administration", "Domains and DNS", "Transactional email", "Backups and monitoring", "Security hardening"],
  },
  {
    slug: "support-recovery",
    name: "Support and Recovery",
    summary: "Maintenance, rescue, migration, and recovery for systems that cannot be allowed to drift or fail.",
    promise: "Restore control, document the system, and reduce the chance of another emergency.",
    accent: "red",
    services: ["Ongoing maintenance", "Technical audits", "Failed-project rescue", "Malware recovery", "Platform migrations", "Annual support agreements"],
  },
];

export const caseStudySchema = z.object({
  slug: z.string(),
  name: z.string(),
  sector: z.string(),
  type: z.enum(["client", "airix_venture", "product"]),
  summary: z.string(),
  challenge: z.string(),
  solution: z.string(),
  ongoingRole: z.string(),
  evidence: evidenceStateSchema,
  publicApproved: z.boolean(),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;

export const caseStudies: CaseStudy[] = [
  { slug: "ajtmbr", name: "AJTMBR", sector: "Scholarly publishing", type: "client", summary: "An active journal platform supported through upgrade and operational stabilisation work.", challenge: "The platform needed a controlled path through compatibility, workflow, and production risk.", solution: "A staging-led OJS programme covering validation, implementation, and handover.", ongoingRole: "Technical publishing support and platform continuity.", evidence: "inferred_needs_review", publicApproved: false },
  { slug: "ku-journals", name: "KU Journals", sector: "University publishing", type: "client", summary: "A multi-journal OJS environment for a university publishing programme.", challenge: "Multiple journals needed a coherent technical foundation and manageable publishing operations.", solution: "A shared journal platform with reusable infrastructure and publishing workflows.", ongoingRole: "Platform and publishing technology support.", evidence: "inferred_needs_review", publicApproved: false },
  { slug: "airix-food", name: "Airix Food", sector: "Food and hospitality", type: "airix_venture", summary: "A digital brand and service experience for an Airix 360 sister venture.", challenge: "The venture needed a clear digital identity and an accessible route from interest to service.", solution: "A customer-facing web experience shaped around authentic African food and service discovery.", ongoingRole: "Airix 360 venture support.", evidence: "inferred_needs_review", publicApproved: false },
  { slug: "airix-store", name: "Airix Store", sector: "E-commerce", type: "airix_venture", summary: "An international commerce operation and Airix 360 sister venture.", challenge: "A broad product catalogue needed reliable discovery, checkout, and cross-region operations.", solution: "An e-commerce system covering catalogue, payments, customer journeys, and operations.", ongoingRole: "Commerce technology and operational support.", evidence: "inferred_needs_review", publicApproved: false },
  { slug: "farmatrak", name: "FarmaTrak", sector: "Agriculture technology", type: "product", summary: "A product concept for making farm activity and operational records easier to manage.", challenge: "Important farm information is often fragmented across paper, messages, and memory.", solution: "A focused operational product that turns recurring farm activity into structured records.", ongoingRole: "Product development and technical stewardship.", evidence: "inferred_needs_review", publicApproved: false },
  { slug: "boredroom", name: "BoredRoom", sector: "Social gaming", type: "product", summary: "A multiplayer social-games product developed as an Airix engineering experiment.", challenge: "Real-time group play needs to feel immediate without making setup complicated.", solution: "A room-based game platform with reusable real-time services and game modules.", ongoingRole: "Product engineering and open development.", evidence: "inferred_needs_review", publicApproved: false },
];

export const openSourceProjects = [
  { slug: "paystack-ojs", name: "Paystack for OJS", area: "Payments", summary: "Payment infrastructure for OJS publishing workflows in African markets.", url: "https://github.com/thathman/PaystackOJS", evidence: "verified" as const },
  { slug: "ojs-magic-login", name: "OJS Magic Login", area: "Access", summary: "A focused sign-in workflow for OJS users and operators.", url: "https://github.com/thathman/ojs-magic-login", evidence: "verified" as const },
  { slug: "submission-fee", name: "Submission Fee for OJS", area: "Workflow", summary: "Submission-fee handling built into the journal workflow.", url: "https://github.com/thathman/submissionFee-OJS", evidence: "verified" as const },
  { slug: "multipay", name: "MultiPay for OJS", area: "Payments", summary: "A payment abstraction for institutions operating across providers.", url: "https://github.com/thathman/ojs-multipay", evidence: "verified" as const },
  { slug: "request-waiver", name: "Request Waiver for OJS", area: "Equity", summary: "A structured way to request and review publishing-fee waivers.", url: "https://github.com/thathman/ojs-request-waiver", evidence: "verified" as const },
];

export const contact = {
  email: "hello@airixmedia.com",
  nigeriaPhone: "+234 905 091 7937",
  nigeriaWhatsApp: "2349050917937",
  usWhatsApp: "19292439382",
  portal: "https://portal.airixmedia.com",
};

export const criticalLocales = ["en", "fr", "pt"] as const;
export type Locale = (typeof criticalLocales)[number];

export const copy = {
  en: {
    nav: { services: "Services", publishing: "Publishing", systems: "Selected Systems", insights: "Insights", company: "Company", support: "Support", portal: "Portal", start: "Start a project" },
    hero: { title: "We build the digital systems organisations rely on.", body: "Airix Media is a boutique creative technology studio that designs, builds, runs, and supports websites, business systems, publishing platforms, and technical infrastructure for organisations in Africa and around the world.", primary: "Start a project", secondary: "Explore selected systems" },
    model: { title: "One partner across the life of the system.", build: "Design and build the right system.", run: "Operate it with care and visibility.", rescue: "Recover control when things go wrong." },
    footer: "African-founded. Globally capable.", language: "Language", theme: "Appearance" },
  fr: {
    nav: { services: "Services", publishing: "Édition", systems: "Systèmes sélectionnés", insights: "Analyses", company: "Entreprise", support: "Assistance", portal: "Portail", start: "Démarrer un projet" },
    hero: { title: "Nous construisons les systèmes numériques dont les organisations dépendent.", body: "Airix Media est un studio de technologie créative qui conçoit, construit, exploite et accompagne des sites web, des systèmes métier, des plateformes éditoriales et des infrastructures techniques en Afrique et dans le monde.", primary: "Démarrer un projet", secondary: "Explorer les systèmes" },
    model: { title: "Un partenaire pendant toute la vie du système.", build: "Concevoir et construire le bon système.", run: "L’exploiter avec soin et visibilité.", rescue: "Reprendre le contrôle lorsque les choses dérapent." },
    footer: "Fondé en Afrique. Capable à l’échelle mondiale.", language: "Langue", theme: "Apparence" },
  pt: {
    nav: { services: "Serviços", publishing: "Publicação", systems: "Sistemas selecionados", insights: "Perspetivas", company: "Empresa", support: "Suporte", portal: "Portal", start: "Iniciar um projeto" },
    hero: { title: "Construímos os sistemas digitais de que as organizações dependem.", body: "A Airix Media é um estúdio de tecnologia criativa que concebe, constrói, opera e apoia websites, sistemas empresariais, plataformas de publicação e infraestrutura técnica em África e no resto do mundo.", primary: "Iniciar um projeto", secondary: "Explorar sistemas" },
    model: { title: "Um parceiro durante toda a vida do sistema.", build: "Conceber e construir o sistema certo.", run: "Operá-lo com cuidado e visibilidade.", rescue: "Recuperar o controlo quando algo corre mal." },
    footer: "Fundada em África. Capaz globalmente.", language: "Idioma", theme: "Aparência" },
} satisfies Record<Locale, unknown>;

export const isLocale = (value: string): value is Locale => criticalLocales.includes(value as Locale);

