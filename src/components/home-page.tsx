import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CloudCog,
  ExternalLink,
  LifeBuoy,
  Orbit,
  PanelsTopLeft,
  Workflow,
} from "lucide-react";
import { Header } from "./header";
import { Footer } from "./footer";
import { SelectedSystems } from "./selected-systems";
import {
  contact,
  copy,
  openSourceProjects,
  practices,
  type Locale,
} from "@/lib/content";
import styles from "./home-page.module.css";

const routeFor = (locale: Locale, path: string) =>
  locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;

const practiceIcons = {
  "digital-experiences": PanelsTopLeft,
  "business-systems": Workflow,
  publishing: BookOpen,
  "managed-infrastructure": CloudCog,
  "support-recovery": LifeBuoy,
} as const;

const proofPoints = [
  "Websites and commerce",
  "Business systems",
  "OJS publishing technology",
  "Managed infrastructure",
  "Support and recovery",
];

export function HomePage({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={`shell ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>CREATIVE TECHNOLOGY · DIGITAL OPERATIONS</span>
              <h1>{t.hero.title}</h1>
              <p>{t.hero.body}</p>
              <div className={styles.heroActions}>
                <Link className="button" href={routeFor(locale, "/start-a-project")}>
                  {t.hero.primary}
                  <ArrowRight size={18} />
                </Link>
                <Link className="button secondary" href={routeFor(locale, "/systems")}>
                  {t.hero.secondary}
                </Link>
              </div>
              <div className={styles.heroMeta}>
                <span><CheckCircle2 size={16} /> Strategy through long-term operation</span>
                <span><CheckCircle2 size={16} /> African-founded, globally capable</span>
              </div>
            </div>

            <div className={styles.heroVisual} aria-label="Airix operating system overview">
              <div className={styles.visualTopbar}>
                <span>AIRIX OPERATING VIEW</span>
                <span className={styles.status}><i /> SYSTEMS ONLINE</span>
              </div>
              <div className={styles.visualCanvas}>
                <div className={`${styles.systemCard} ${styles.cardWebsite}`}>
                  <span>01</span>
                  <strong>Digital experience</strong>
                  <small>Website · Commerce · Content</small>
                </div>
                <div className={`${styles.systemCard} ${styles.cardOperations}`}>
                  <span>02</span>
                  <strong>Business operations</strong>
                  <small>Portals · Workflows · Integrations</small>
                </div>
                <div className={`${styles.systemCard} ${styles.cardPublishing}`}>
                  <span>03</span>
                  <strong>Publishing technology</strong>
                  <small>OJS · Editorial systems · Payments</small>
                </div>
                <div className={`${styles.systemCard} ${styles.cardInfrastructure}`}>
                  <span>04</span>
                  <strong>Infrastructure</strong>
                  <small>Hosting · Monitoring · Security</small>
                </div>
                <div className={styles.coreNode}>
                  <Orbit size={28} />
                  <strong>AIRIX</strong>
                  <small>Design · Build · Run</small>
                </div>
                <svg className={styles.connections} viewBox="0 0 700 540" aria-hidden="true">
                  <path d="M350 270C270 230 230 170 190 110" />
                  <path d="M350 270C430 225 490 175 535 110" />
                  <path d="M350 270C270 330 225 390 185 445" />
                  <path d="M350 270C430 330 490 390 535 445" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.capabilityStrip} aria-label="Airix capabilities">
          <div className={`shell ${styles.capabilityInner}`}>
            {proofPoints.map((point, index) => (
              <span key={point}><b>0{index + 1}</b>{point}</span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className="shell">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.eyebrow}>WHAT WE DO</span>
                <h2>One partner across the life of your digital system.</h2>
              </div>
              <p>
                Airix combines design, engineering, publishing expertise, infrastructure,
                and ongoing support so organisations do not have to coordinate five disconnected vendors.
              </p>
            </div>

            <div className={styles.practiceGrid}>
              {practices.map((practice) => {
                const Icon = practiceIcons[practice.slug as keyof typeof practiceIcons];
                const href = practice.slug === "publishing"
                  ? routeFor(locale, "/publishing")
                  : routeFor(locale, `/services/${practice.slug}`);

                return (
                  <Link className={styles.practiceCard} href={href} key={practice.slug}>
                    <div className={styles.practiceIcon}>{Icon ? <Icon size={24} /> : null}</div>
                    <span className={styles.practiceNumber}>0{practices.indexOf(practice) + 1}</span>
                    <h3>{practice.name}</h3>
                    <p>{practice.summary}</p>
                    <span className={styles.cardLink}>Explore capability <ArrowRight size={16} /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.darkSection}`}>
          <div className="shell">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.eyebrow}>OUR OPERATING MODEL</span>
                <h2>{t.model.title}</h2>
              </div>
              <p>
                Launch is not the finish line. We stay accountable for performance,
                continuity, improvement, documentation, and the people who depend on the system.
              </p>
            </div>

            <div className={styles.modelGrid}>
              <article>
                <span>01</span>
                <h3>Build</h3>
                <p>{t.model.build}</p>
              </article>
              <article>
                <span>02</span>
                <h3>Run</h3>
                <p>{t.model.run}</p>
              </article>
              <article>
                <span>03</span>
                <h3>Recover</h3>
                <p>{t.model.rescue}</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="shell">
            <div className={styles.workHeading}>
              <div>
                <span className={styles.eyebrow}>SELECTED SYSTEMS</span>
                <h2>Work shaped around real operational needs.</h2>
              </div>
              <Link className="text-link" href={routeFor(locale, "/systems")}>
                View all case studies <ArrowRight size={16} />
              </Link>
            </div>
            <SelectedSystems />
          </div>
        </section>

        <section className={`${styles.section} ${styles.publishingSection}`}>
          <div className={`shell ${styles.publishingLayout}`}>
            <div>
              <span className={styles.eyebrow}>AIRIX PUBLISHING TECHNOLOGY</span>
              <h2>African journals deserve world-class publishing infrastructure.</h2>
              <p>
                We design, upgrade, host, extend, and support OJS platforms for journals,
                universities, publishers, and research organisations.
              </p>
              <Link className="button" href={routeFor(locale, "/publishing")}>
                Explore publishing services <ArrowRight size={18} />
              </Link>
            </div>
            <div className={styles.workflowPanel}>
              {[
                ["01", "Platform strategy", "Choose the right architecture and operating model."],
                ["02", "Implementation", "Configure, migrate, customise, and validate the platform."],
                ["03", "Editorial operations", "Support submissions, reviews, metadata, and payments."],
                ["04", "Continuity", "Maintain, monitor, secure, and improve after launch."],
              ].map(([number, title, body]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div><strong>{title}</strong><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="shell">
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.eyebrow}>OPEN ENGINEERING</span>
                <h2>Useful infrastructure, shared in public.</h2>
              </div>
              <p>
                Our open-source work demonstrates practical knowledge of publishing workflows,
                payments, access, and maintainable platform engineering.
              </p>
            </div>
            <div className={styles.openSourceGrid}>
              {openSourceProjects.map((project) => (
                <a href={project.url} target="_blank" rel="noreferrer" key={project.slug}>
                  <span>{project.area}</span>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <ExternalLink size={18} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={`shell ${styles.ctaInner}`}>
            <div>
              <span className={styles.eyebrow}>START WITH THE PROBLEM</span>
              <h2>Tell us what needs to work better.</h2>
            </div>
            <div>
              <p>
                Share the challenge, the current system, and what is at risk. We will help define
                the right path before recommending a platform, scope, or package.
              </p>
              <div className={styles.ctaActions}>
                <Link className="button" href={routeFor(locale, "/start-a-project")}>
                  Start a project <ArrowRight size={18} />
                </Link>
                <a className="button secondary" href={`mailto:${contact.email}`}>Email {contact.email}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
