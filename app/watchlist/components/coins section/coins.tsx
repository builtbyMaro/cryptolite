"use client";
import CoinRow from "@/components/coin row/coinRow";
import CoinPageLoader from "@/components/loading screens/coin page loader/coinPageLoader";
import Error from "@/components/error/error";
import { useWatchlist } from "@/lib/hooks/useWatchlist";

const CoinSection = () => {
  const { coins, loading, error, isCoolingDown, refetch } = useWatchlist();

  if (loading) {
    return <CoinPageLoader />;
  }

  if (error) {
    return (
      <Error
        message={error}
        actionText="Retry"
        action={refetch}
        isCoolingDown={isCoolingDown}
      />
    );
  }

  if (coins.length === 0) {
    return (
      <Error
        message={
          <span>
            Try clicking on the <i className="bx bx-star" /> icon to add coins
            to your watchlist
          </span>
        }
      />
    );
  }

  return (
    <>
      {coins.map((coin) => (
        <CoinRow key={coin.id} coin={coin} showrank={false} />
      ))}
    </>
  );
};

export default CoinSection;
