import type { paystackOjsProject } from "@/content/atlas/knowledge";
import styles from "./atlas-knowledge.module.css";

type OpenSourceProjectRecord = typeof paystackOjsProject;

export function OpenSourceProject({ project }: { project: OpenSourceProjectRecord }) {
  return (
    <article className={styles.openSourceProject} data-open-source-project data-evidence-status="verified-public-repository">
      <header><span>Verified public repository</span><h3>{project.name}</h3><p>{project.purpose}</p></header>
      <div className={styles.openSourceProblem}><span>Publishing problem</span><p>{project.problem}</p></div>
      <div className={styles.openSourceRegister}>
        <section><h4>Repository record</h4><strong>{project.status}</strong><ul>{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h4>Limits kept visible</h4><ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>
      <a href={project.repository} target="_blank" rel="noreferrer">Inspect the OJS Paystack Payment Gateway repository <span aria-hidden="true">↗</span></a>
    </article>
  );
}
