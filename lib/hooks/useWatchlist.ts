import { useState, useEffect, useRef, useCallback } from "react";
import { Coin } from "@/lib/types/types";
import { fetchWatchlistCoins } from "../API interactions/fetchWatchlist";
import { useAppContext } from "../context/appContext";
import { useQuery } from "@tanstack/react-query";

export const useWatchlist = () => {
  const { isSearching, watchlist } = useAppContext();

  const { data, error, isError, isLoading, refetch } = useQuery<
    Coin[],
    Error & { status?: number }
  >({
    queryKey: ["watchlist"],
    queryFn: () => fetchWatchlistCoins(watchlist),
    staleTime: 30 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: 30 * 1000,
    enabled: !isSearching,
  });

  return {
    coins: data ?? [],
    isLoading,
    error,
    isError,
    refetch,
  };
};
