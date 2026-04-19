import { useState, useEffect, useRef, useCallback } from "react";
import { fetchChart } from "@/lib/API interactions/fetchChart";
import { useAppContext } from "../context/appContext";

type ChartPoint = {
  time: number;
  price: number;
};

export const useChart = (id: string) => {
  const { isSearching } = useAppContext();
  const [timeframe, setTimeframe] = useState<"1" | "7" | "30">("1");
  const [data, setData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const lastFetchTime = useRef(0);
  const cooldownUntil = useRef(0);

  const loadChart = useCallback(
    async (showLoading = false, force = false) => {
      const now = Date.now();

      // block during cooldown
      if (!force && now < cooldownUntil.current) return;

      // prevent spam fetches
      if (!force && now - lastFetchTime.current < 60000) return;

      lastFetchTime.current = now;

      if (showLoading) setLoading(true);
      setError(null);

      try {
        const res = await fetchChart(id, timeframe);

        const formattedRes: ChartPoint[] = res.prices.map(
          ([time, price]: [number, number]) => ({
            time,
            price,
          }),
        );

        setData(formattedRes);

        cooldownUntil.current = 0;
        setIsCoolingDown(false);
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

        if (err.message === "Network Error") {
          cooldownUntil.current = Date.now() + 15000;
          setError(
            "Connection issue or rate limit reached. Please wait a moment.",
          );
          return;
        }

        if (err.status >= 500) {
          setError("Server error. Try again later.");
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    },
    [id, timeframe],
  );

  // initial load
  useEffect(() => {
    if (isSearching) return;

    loadChart(true, true);
  }, [id, isSearching, loadChart]);

  // auto refresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      if (isSearching) return;

      loadChart(false);
    }, 60000);

    return () => clearInterval(interval);
  }, [loadChart, isSearching]);

  // refetch on tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && !isSearching) {
        loadChart(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [loadChart, isSearching]);

  // manual refetch
  const refetch = () => {
    loadChart(true, true);
  };

  return {
    data,
    loading,
    error,
    refetch,
    isCoolingDown,
    timeframe,
    setTimeframe,
  };
};
