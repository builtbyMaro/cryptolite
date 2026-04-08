import styles from "./tableheader.module.css";

const TableHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.rankContainer}>
        <p className={styles.headerText}>#</p>
      </div>
      <div className={styles.coinContainer}>
        <p className={styles.headerText}>Coin</p>
      </div>
      <div className={styles.priceContainer}>
        <p className={styles.headerText}>Price</p>
      </div>
      <div className={styles.hourContainer}>
        <p className={styles.headerText}>1h%</p>
      </div>
      <div className={styles.dayContainer}>
        <p className={styles.headerText}>24h%</p>
      </div>
      <div className={styles.weekContainer}>
        <p className={styles.headerText}>7d%</p>
      </div>
      <div className={styles.marketCapContainer}>
        <p className={styles.headerText}>Market Cap</p>
      </div>
    </div>
  );
};

export default TableHeader;
