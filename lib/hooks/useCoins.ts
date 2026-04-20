import { useState, useEffect, useRef, useCallback } from "react";
import { Coin } from "@/lib/types/types";
import { fetchCoins } from "@/lib/API interactions/fetchCoins";
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
        const data = await fetchCoins(page);
        setCoins(data);

        cooldownUntil.current = 0;
        setIsCoolingDown(false);
        console.log("I just Fetched");
      } catch (err: any) {
        if (err.status === 429) {
          const coolDownEnd = Date.now() + 15000;
          cooldownUntil.current = coolDownEnd;
          setIsCoolingDown(true);

          setError("Too many requests. Please wait a moment.");
          setTimeout(() => {
            setIsCoolingDown(false);
          }, 15000);
          return;
        }

        // network / CORS failure fallback
        if (err.message === "Network Error") {
          cooldownUntil.current = Date.now() + 15000;
          setError(
            "Connection issue or rate limit reached. Please wait a moment.",
          );
          return;
        }

        // server errors
        if (err.status >= 500) {
          setError("Server error. Try again later.");
        } else {
          setError("Something went wrong.");
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

  // auto refresh
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
