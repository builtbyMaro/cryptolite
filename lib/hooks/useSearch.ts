import { Coin } from "../types/types";
import { searchCoins } from "../API interactions/fetchSearch";
import { useDebounce } from "./useDebounce";
import { useAppContext } from "../context/appContext";
import { useQuery } from "@tanstack/react-query";

type Props = {
  search: string;
};

export const useSearch = ({ search }: Props) => {
  const debouncedSearch = useDebounce({ search });
  const { isSearching } = useAppContext();

  const { data, error, isError, isLoading, refetch } = useQuery<
    Coin[],
    Error & { status?: number }
  >({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchCoins(debouncedSearch),
    staleTime: 30 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: 30 * 1000,
    enabled: isSearching && !!debouncedSearch,
  });

  return {
    coins: data ?? [],
    error,
    isError,
    isLoading,
    refetch,
    hasSearched: !!debouncedSearch,
  };
};
