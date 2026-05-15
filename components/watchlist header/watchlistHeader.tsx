"use client";
import { useState } from "react";
import styles from "./watchlistheader.module.css";
import ClearWatchlist from "../Clear watchlist/clearWatchlist";
import { useAppContext } from "@/lib/context/appContext";

const WatchlistHeader = () => {
  const [showClear, setShowClear] = useState(false);
  const { watchlist } = useAppContext();
  const watchlistEmpty = watchlist.length < 1;

  return (
    <>
      <div className={styles.container}>
        <h2>
          Watch<span>List</span>
        </h2>
        <button
          onClick={() => setShowClear(true)}
          className={styles.clearBtn}
          disabled={watchlistEmpty}
        >
          Clear Watchlist
        </button>
      </div>
      {showClear && <ClearWatchlist setShowClear={setShowClear} />}
    </>
  );
};

export default WatchlistHeader;
