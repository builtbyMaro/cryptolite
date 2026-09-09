"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/lib/context/appContext";
import { fetchData } from "@/lib/API interactions/fetchData";
import { CoinDetails } from "@/lib/types/types";
import CoinNav from "./coin nav/coinNav";
import PriceSection from "./price section/priceSection";
import DetailSection from "./detail section/detailSection";
import InfoSection from "./info section/infoSection";

type Props = {
  id: string;
};

const getCoinUrl = (id: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;

const CoinClient = ({ id }: Props) => {
  const { isSearching } = useAppContext();

  const { data: coin } = useQuery<CoinDetails, Error & { status?: number }>({
    queryKey: ["coin", id],
    queryFn: () => fetchData(getCoinUrl(id)),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
    enabled: !isSearching,
  });

  if (!coin) {
    return null;
  }

  const coinName = coin.name;
  const coinSymbol = coin.symbol;
  const coinId = coin.id;
  const coinPrice = coin.market_data.current_price.usd;
  const coinPercentage = coin.market_data.price_change_percentage_24h;
  const coinImage = coin.image.large;
  const coinMarketData = coin.market_data;
  const coinLinks = coin.links;

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
