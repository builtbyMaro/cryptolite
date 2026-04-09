import styles from "./coinloader.module.css";

const CoinRowLoader = () => {
  return (
    <div className={styles.rowContainer}>
      <div className={styles.rankContainer}></div>
      <div className={styles.coinContainer}></div>
      <div className={styles.priceContainer}></div>
      <div className={styles.hourContainer}></div>
      <div className={styles.dayContainer}></div>
      <div className={styles.weekContainer}></div>
      <div className={styles.marketCapContainer}></div>
    </div>
  );
};

export default CoinRowLoader;
