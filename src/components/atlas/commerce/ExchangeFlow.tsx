import { commerceExchange } from "@/content/atlas/commerce";
import styles from "./atlas-commerce.module.css";

export function ExchangeFlow() {
  return (
    <section className={styles.exchange} aria-labelledby="exchange-title">
      <header>
        <span>Exchange begins</span>
        <h2 id="exchange-title">An action enters the district. Responsibility carries it through.</h2>
        <p>This is a working field, not a guaranteed delivery sequence. Scope and order change with the organisation and system.</p>
      </header>
      <ol className={styles.exchangeYard}>
        {commerceExchange.map((step, index) => (
          <li key={step.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{step.name}</h3><p>{step.detail}</p></div>
          </li>
        ))}
      </ol>
      <div className={styles.exchangeObjects} aria-hidden="true"><i /><i /><i /></div>
    </section>
  );
}
