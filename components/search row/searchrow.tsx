"use client";
import styles from "./searchrow.module.css";
import { Coin } from "@/lib/types/types";
import { getPercentageMeta } from "@/lib/utils/percentageMeta";
import Link from "next/link";

type Prop = {
  coin: Coin;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchRow = ({ coin, setShowSearch }: Prop) => {
  const day = getPercentageMeta(coin.price_change_percentage_24h);

  return (
    <Link href={`/coin/${coin.id}`} onClick={() => setShowSearch(false)}>
      <div className={styles.rowContainer}>
        <div className={styles.iconContainer}>
          <img src={coin.image} alt={coin.name} width={20} height={20} />
        </div>
        <div className={styles.nameContainer}>
          <p>{coin.name}</p>
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
        <div className={styles.dayContainer}>
          <p className={styles[day.class]}>
            <i className={day.icon} />
            {coin.price_change_percentage_24h
              ? `${coin.price_change_percentage_24h.toFixed(1)}%`
              : "-"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchRow;
