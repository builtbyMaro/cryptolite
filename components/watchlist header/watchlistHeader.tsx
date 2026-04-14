"use client";
import styles from "./watchlistheader.module.css";
import { useAppContext } from "@/lib/context/appContext";

const WatchlistHeader = () => {
  const { clearWatchlist } = useAppContext();

  return (
    <div className={styles.container}>
      <h2>
        Watch<span>List</span>
      </h2>
      <button onClick={clearWatchlist} className={styles.clearBtn}>
        Clear Watchlist
      </button>
    </div>
  );
};

export default WatchlistHeader;
