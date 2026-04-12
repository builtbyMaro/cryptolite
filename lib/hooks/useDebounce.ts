import { useState, useEffect } from "react";

type Prop = {
  search: string;
};
export const useDebounce = ({ search }: Prop) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);

    return () => clearTimeout(timeout);
  }, [search]);

  return debouncedSearch;
};
