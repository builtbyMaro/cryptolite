"use client";
import styles from "./coinnav.module.css";
import { useAppContext } from "@/lib/context/appContext";
import { useBack } from "@/lib/hooks/useBack";

type Props = {
  coinName: string;
  coinSymbol: string;
  coinId: string;
};

const CoinNav = ({ coinName, coinSymbol, coinId }: Props) => {
  const handleBack = useBack();
  const { isInWatchlist, toggleWatchlist } = useAppContext();

  return (
    <div className={`${styles.nav}`}>
      <div className={styles.backButton} onClick={handleBack}>
        <i className="bx bx-chevron-left" />
        <h5>Back</h5>
      </div>
      <div className={styles.nameContainer}>
        <h2 className={styles.name}>
          {coinName}
          <span>{coinSymbol.toUpperCase()}</span>
        </h2>
        <i
          className={
            isInWatchlist(coinId)
              ? `bx bxs-star ${styles.filledIcon}`
              : "bx bx-star"
          }
          onClick={() => toggleWatchlist(coinId)}
        />
      </div>
    </div>
  );
};

export default CoinNav;
