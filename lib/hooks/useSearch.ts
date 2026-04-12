import { useState, useEffect, useRef } from "react";
import { Coin } from "../types/types";
import { searchCoins } from "../API interactions/fetchSearch";
import { useDebounce } from "./useDebounce";

type Props = {
  search: string;
};

export const useSearch = ({ search }: Props) => {
  const debouncedSearch = useDebounce({ search });
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const cooldownUntil = useRef(0);

  useEffect(() => {
    const loadCoins = async () => {
      if (!debouncedSearch) {
        setCoins([]);
        setHasSearched(false);
        setLoading(false);
        return;
      }
      setHasSearched(true);
      setLoading(true);
      setError(null);
      try {
        const coins = await searchCoins(debouncedSearch);
        setCoins(coins);
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
    };

    loadCoins();
  }, [debouncedSearch]);

  return {
    coins,
    loading,
    error,
    isCoolingDown,
    hasSearched,
  };
};
