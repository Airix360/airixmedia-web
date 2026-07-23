import styles from "./atlas-arrival.module.css";

export function ArrivalReviewStatus() {
  return (
    <aside className={styles.reviewStatus} aria-label="Internal review status">
      <strong>Internal W1 review</strong>
      <span>ILL-0001 remains candidate artwork</span>
      <span>Not approved for public use</span>
    </aside>
  );
}
