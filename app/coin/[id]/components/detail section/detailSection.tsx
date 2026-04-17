import styles from "./detail.module.css";

type Props = {
  coinData: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;

    market_cap: {
      usd: number;
    };

    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;

    high_24h: {
      usd: number;
    };

    low_24h: {
      usd: number;
    };
  };
  coinId: string;
};

const DetailSection = ({ coinData, coinId }: Props) => {
  return (
    <section className={styles.details}>
      <div className={styles.detailContainer}>
        <div className={styles.detailRow}>
          <h5 className={styles.detailItem}>Market Cap:</h5>
          <h5 className={styles.detailValue}>
            {coinData.market_cap.usd.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h5>
        </div>
        <div className={styles.detailRow}>
          <h5 className={styles.detailItem}>Circulating Supply:</h5>
          <h5 className={styles.detailValue}>
            {coinData.circulating_supply.toLocaleString()}
          </h5>
        </div>
        <div className={styles.detailRow}>
          <h5 className={styles.detailItem}>Total Supply:</h5>
          <h5 className={styles.detailValue}>
            {coinData.total_supply
              ? coinData.total_supply.toLocaleString()
              : "-"}
          </h5>
        </div>
        <div className={styles.detailRow}>
          <h5 className={styles.detailItem}>Max Supply:</h5>
          <h5 className={styles.detailValue}>
            {coinData.max_supply ? coinData.max_supply.toLocaleString() : "-"}
          </h5>
        </div>
        <div className={styles.detailRow}>
          <h5 className={styles.detailItem}>24h High:</h5>
          <h5 className={styles.detailValue}>
            {coinData.high_24h.usd.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h5>
        </div>
        <div className={styles.detailRow}>
          <h5 className={styles.detailItem}>24h Low:</h5>
          <h5 className={styles.detailValue}>
            {coinData.low_24h.usd.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h5>
        </div>
      </div>
      <div className={`${styles.chartContainer} ${styles.card}`}></div>
    </section>
  );
};

export default DetailSection;
