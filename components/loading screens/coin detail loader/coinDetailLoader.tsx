"use client";
import styles from "./coindetail.module.css";
import "boxicons/css/boxicons.min.css";
import { useRouter } from "next/navigation";

const CoinDetailLoader = () => {
  const router = useRouter();
  return (
    <>
      <div className={`${styles.nav}`}>
        <div className={styles.backButton} onClick={() => router.back()}>
          <i className="bx bx-chevron-left" />
          <h5>Back</h5>
        </div>
        <div className={`${styles.navNameContainer} ${styles.card}`}></div>
      </div>
      <section className={styles.priceSection}>
        <div className={styles.priceContainer}>
          <div className={`${styles.coin} ${styles.card}`}></div>
          <div className={`${styles.price} ${styles.card}`}></div>
        </div>
      </section>
      <section className={styles.details}>
        <div className={styles.detailContainer}>
          <div className={styles.detailRow}>
            <div className={`${styles.detailItem} ${styles.card}`}></div>
            <div className={`${styles.detailValue} ${styles.card}`}></div>
          </div>
          <div className={styles.detailRow}>
            <div className={`${styles.detailItem} ${styles.card}`}></div>
            <div className={`${styles.detailValue} ${styles.card}`}></div>
          </div>
          <div className={styles.detailRow}>
            <div className={`${styles.detailItem} ${styles.card}`}></div>
            <div className={`${styles.detailValue} ${styles.card}`}></div>
          </div>
          <div className={styles.detailRow}>
            <div className={`${styles.detailItem} ${styles.card}`}></div>
            <div className={`${styles.detailValue} ${styles.card}`}></div>
          </div>
          <div className={styles.detailRow}>
            <div className={`${styles.detailItem} ${styles.card}`}></div>
            <div className={`${styles.detailValue} ${styles.card}`}></div>
          </div>
          <div className={styles.detailRow}>
            <div className={`${styles.detailItem} ${styles.card}`}></div>
            <div className={`${styles.detailValue} ${styles.card}`}></div>
          </div>
        </div>
        <div className={`${styles.chartContainer} ${styles.card}`}></div>
      </section>
      <section className={styles.information}>
        <div className={styles.informationCard}>
          <div className={styles.infoRow}>
            <div className={`${styles.infoItem} ${styles.card}`}></div>
            <div className={`${styles.infoValue} ${styles.card}`}></div>
          </div>
          <div className={styles.infoRow}>
            <div className={`${styles.infoItem} ${styles.card}`}></div>
            <div className={`${styles.infoValue} ${styles.card}`}></div>
          </div>
          <div className={styles.infoRow}>
            <div className={`${styles.infoItem} ${styles.card}`}></div>
            <div className={`${styles.infoValue} ${styles.card}`}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoinDetailLoader;
