"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/lib/context/appContext";
import { CoinDetails } from "@/lib/types/types";
import CoinNav from "./coin nav/coinNav";
import PriceSection from "./price section/priceSection";
import DetailSection from "./detail section/detailSection";
import InfoSection from "./info section/infoSection";

type Props = {
  coin: CoinDetails;
};

const CoinClient = ({ coin }: Props) => {
  const { isSearching } = useAppContext();
  const coinName = coin.name;
  const coinSymbol = coin.symbol;
  const coinId = coin.id;
  const coinPrice = coin.market_data.current_price.usd;
  const coinPercentage = coin.market_data.price_change_percentage_24h;
  const coinImage = coin.image.large;
  const coinMarketData = coin.market_data;
  const coinLinks = coin.links;

  const router = useRouter();

  // auto re-fetch
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      if (isSearching) return;

      router.refresh();
    }, 60000);

    return () => clearInterval(interval);
  }, [router, isSearching]);

  // re-fetch when user returns
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && !isSearching) {
        router.refresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [router, isSearching]);

  return (
    <>
      <CoinNav coinId={coinId} coinName={coinName} />
      <PriceSection
        image={coinImage}
        name={coinName}
        symbol={coinSymbol}
        price={coinPrice}
        percentage={coinPercentage}
      />
      <DetailSection coinData={coinMarketData} coinId={coinId} />
      <InfoSection links={coinLinks} coinName={coinName} />
    </>
  );
};

export default CoinClient;
