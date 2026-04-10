"use client";
import CoinPageLoader from "@/components/loading screens/coin page loader/coinPageLoader";
import Error from "@/components/error/error";
import { useCoins } from "@/lib/hooks/useCoins";
import CoinRow from "@/components/coin row/coinRow";
import PageNavigator from "@/components/page navigator/pageNavigator";

const CoinSection = () => {
  const { coins, loading, error, refetch, isCoolingDown, page, setPage } =
    useCoins();

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
    return <Error message="No Coins Available" />;
  }

  return (
    <>
      {coins.map((coin) => (
        <CoinRow key={coin.id} coin={coin} />
      ))}
      {!loading && <PageNavigator page={page} setPage={setPage} />}
    </>
  );
};

export default CoinSection;
