import { useState, useEffect, useRef, useCallback } from "react";
import { Coin } from "@/lib/types/types";
import { fetchData } from "../API interactions/fetchData";
import { useAppContext } from "../context/appContext";

export const useCoins = () => {
  const { isSearching } = useAppContext();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const lastFetchTime = useRef(0);
  const cooldownUntil = useRef(0);

  const loadCoins = useCallback(
    async (showLoading = false, force = false) => {
      const now = Date.now();

      // cooldown check
      if (!force && now < cooldownUntil.current) return;

      // stop spam from auto-refresh effects
      if (!force && now - lastFetchTime.current < 20000) return;

      lastFetchTime.current = now;

      if (showLoading) setLoading(true);
      setError(null);

      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=1h,7d`;
        const data = await fetchData(url);
        setCoins(data);

        cooldownUntil.current = 0;
        setIsCoolingDown(false);
      } catch (error: any) {
        if (error.status) {
          if (error.status === 429) {
            const coolDownEnd = Date.now() + 15000;
            cooldownUntil.current = coolDownEnd;
            setIsCoolingDown(true);

            setError("Too many requests. Please wait a moment.");
            setTimeout(() => {
              setIsCoolingDown(false);
            }, 15000);
            return;
          }

          if (typeof error.status === "number" && error.status >= 500) {
            setError("Server error. Try again later.");
            return;
          }
        } else {
          // handles fetch request failure
          cooldownUntil.current = Date.now() + 15000;
          setError("Please check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [page],
  );

  // initial load + whenever page changes
  useEffect(() => {
    if (isSearching) return;

    loadCoins(true, true);
  }, [isSearching, loadCoins]);

  // auto refresh every 30 secs
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      if (isSearching) return;

      loadCoins(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [loadCoins, isSearching]);

  // refresh when user returns to tab
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && !isSearching) {
        loadCoins(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [loadCoins, isSearching]);

  // manual retry function
  const refetch = () => {
    loadCoins(true, true);
  };

  // scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return {
    coins,
    page,
    setPage,
    loading,
    error,
    refetch,
    isCoolingDown,
  };
};
