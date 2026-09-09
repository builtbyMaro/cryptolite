"use client";
import CoinPageLoader from "@/components/loading screens/coin page loader/coinPageLoader";
import ErrorComp from "@/components/error/error";
import { useCoins } from "@/lib/hooks/useCoins";
import CoinRow from "@/components/coin row/coinRow";
import PageNavigator from "@/components/page navigator/pageNavigator";

const CoinSection = () => {
  const {
    coins,
    currentPage,
    setCurrentPage,
    error,
    isError,
    isLoading,
    refetch,
  } = useCoins();

  if (isLoading) {
    return <CoinPageLoader />;
  }

  if (isError) {
    return <ErrorComp error={error} action={refetch} />;
  }

  if (coins.length === 0) {
    const error = new Error("NO COINS");
    return <ErrorComp error={error} />;
  }

  return (
    <>
      {coins.map((coin) => (
        <CoinRow key={coin.id} coin={coin} />
      ))}
      {!isLoading && (
        <PageNavigator page={currentPage} setPage={setCurrentPage} />
      )}
    </>
  );
};

export default CoinSection;
