import { useState, useEffect, useRef, useCallback } from "react";
import { Coin } from "@/lib/types/types";
import { fetchWatchlistCoins } from "../API interactions/fetchWatchlist";
import { useAppContext } from "../context/appContext";

export const useWatchlist = () => {
  const { isSearching, watchlist } = useAppContext();

  const [coins, setCoins] = useState<Coin[]>([]);
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
        const data = await fetchWatchlistCoins(watchlist);
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
          cooldownUntil.current = Date.now() + 15000;
          setError("Please check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [watchlist],
  );

  // initial load + whenever watchlist changes
  useEffect(() => {
    if (isSearching) return;

    loadCoins(true, true);
  }, [watchlist, isSearching, loadCoins]);

  // auto refresh every 30 secs
  useEffect(() => {
    const interval = setInterval(() => {
      // this only works if the user is currently on viewing the page.
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

  return {
    coins,
    loading,
    error,
    refetch,
    isCoolingDown,
  };
};
