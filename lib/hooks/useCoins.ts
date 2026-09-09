import { useState, useEffect } from "react";
import { Coin } from "@/lib/types/types";
import { fetchData } from "../API interactions/fetchData";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { noop } from "@tanstack/react-query";
import { useAppContext } from "../context/appContext";

export const useCoins = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isSearching } = useAppContext();
  const queryClient = useQueryClient();

  const genUrl = (page: number) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=1h,7d`;

  const { data, error, isError, isLoading, refetch } = useQuery<
    Coin[],
    Error & { status?: number }
  >({
    queryKey: ["coins", currentPage],
    queryFn: () => fetchData(genUrl(currentPage)),
    staleTime: 30 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: 30 * 1000,
    enabled: !isSearching,
  });

  // Prefetch next page
  useEffect(() => {
    const nextPage = currentPage + 1;
    queryClient
      .query({
        queryKey: ["coins", nextPage],
        queryFn: () => fetchData(genUrl(nextPage)),
      })
      .catch(noop);
  }, [currentPage, queryClient]);

  // scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return {
    coins: data ?? [],
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    isError,
    refetch,
  };
};
