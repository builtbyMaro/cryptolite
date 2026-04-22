import styles from "./coinrow.module.css";
import { Coin } from "@/lib/types/types";
import Link from "next/link";
import { getPercentageMeta } from "@/lib/utils/percentageMeta";
import { useAppContext } from "@/lib/context/appContext";

type Prop = {
  coin: Coin;
  showrank?: boolean;
};

const CoinRow = ({ coin, showrank = true }: Prop) => {
  const { toggleWatchlist, isInWatchlist } = useAppContext();
  const hour = getPercentageMeta(coin.price_change_percentage_1h_in_currency);
  const day = getPercentageMeta(coin.price_change_percentage_24h);
  const week = getPercentageMeta(coin.price_change_percentage_7d_in_currency);

  return (
    <div className={styles.rowContainer}>
      <div className={styles.rankContainer}>
        <i
          className={
            isInWatchlist(coin.id)
              ? `bx bxs-star ${styles.filledIcon}`
              : "bx bx-star"
          }
          onClick={() => toggleWatchlist(coin.id)}
        />
        {showrank && <p>{coin.market_cap_rank}</p>}
      </div>
      <Link href={`/coin/${coin.id}`} className={styles.link}>
        <div className={styles.coinContainer}>
          <img src={coin.image} alt={coin.name} width={20} height={20} />
          <span className={styles.coinName}>
            <p>{coin.name}</p>
            <span>{coin.symbol.toUpperCase()}</span>
          </span>
        </div>
        <div className={styles.priceContainer}>
          <p>
            {coin.current_price
              ? coin.current_price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "-"}
          </p>
        </div>
        <div className={styles.hourContainer}>
          <p className={styles[hour.class]}>
            <i className={hour.icon} />
            {coin.price_change_percentage_1h_in_currency
              ? `${coin.price_change_percentage_1h_in_currency.toFixed(1)}%`
              : "-"}
          </p>
        </div>
        <div className={styles.dayContainer}>
          <p className={styles[day.class]}>
            <i className={day.icon} />
            {coin.price_change_percentage_24h
              ? `${coin.price_change_percentage_24h.toFixed(1)}%`
              : "-"}
          </p>
        </div>
        <div className={styles.weekContainer}>
          <p className={styles[week.class]}>
            <i className={week.icon} />
            {coin.price_change_percentage_7d_in_currency
              ? `${coin.price_change_percentage_7d_in_currency.toFixed(1)}%`
              : "-"}
          </p>
        </div>
        <div className={styles.marketCapContainer}>
          <p>
            {coin.market_cap
              ? coin.market_cap.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "-"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CoinRow;
