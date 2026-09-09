import { useState, useEffect } from "react";
import { fetchData } from "@/lib/API interactions/fetchData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../context/appContext";

type ChartPoint = {
  time: number;
  price: number;
};

export const useChart = (id: string) => {
  const [timeframe, setTimeframe] = useState<"1" | "7" | "30">("1");
  const { isSearching } = useAppContext();
  const queryClient = useQueryClient();

  const genUrl = (id: string, timeframe: string) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeframe}`;

  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["chart", id, timeframe],
    queryFn: () => fetchData(genUrl(id, timeframe)),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !isSearching,
  });

  useEffect(() => {
    queryClient.query({
      queryKey: ["chart", id, "7"],
      queryFn: () => fetchData(genUrl(id, "7")),
    });

    queryClient.query({
      queryKey: ["chart", id, "30"],
      queryFn: () => fetchData(genUrl(id, "30")),
    });
  }, [queryClient]);

  const formattedData: ChartPoint[] = data?.prices.map(
    ([time, price]: [number, number]) => ({
      time,
      price,
    }),
  );

  return {
    data: formattedData ?? [],
    isLoading,
    error,
    isError,
    refetch,
    timeframe,
    setTimeframe,
  };
};
