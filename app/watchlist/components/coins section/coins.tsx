"use client";
import styles from "./coins.module.css";
import CoinRow from "@/components/coin row/coinRow";
import CoinPageLoader from "@/components/loading screens/coin page loader/coinPageLoader";
import Error from "@/components/error/error";
import { useWatchlist } from "@/lib/hooks/useWatchlist";

const CoinSection = () => {
  const { coins, error, isError, isLoading, refetch } = useWatchlist();

  if (isLoading) {
    return <CoinPageLoader />;
  }

  if (isError) {
    return <Error error={error} action={refetch} />;
  }

  if (coins.length === 0) {
    return (
      <div className={styles.container}>
        <span className={styles.message}>
          Try clicking on the <i className="bx bx-star" /> icon to add coins to
          your watchlist
        </span>
      </div>
    );
  }

  return (
    <>
      {coins?.map((coin) => (
        <CoinRow key={coin.id} coin={coin} showrank={false} />
      ))}
    </>
  );
};

export default CoinSection;
