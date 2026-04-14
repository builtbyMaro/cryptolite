"use client";
import { createContext, useContext, useState, useEffect } from "react";

type AppContextType = {
  // Search State
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;

  // Watchlist State
  watchlist: string[];

  // Watchlist Actions
  toggleWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  clearWatchlist: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Search State
  const [isSearching, setIsSearching] = useState(false);

  // Watchlist State (in-memory source of truth)
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Load Watchlist from localStorage on App Load
  useEffect(() => {
    const stored = localStorage.getItem("watchlist");

    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  // sync Watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Toggle watchlist (add if not present, remove if present)
  const toggleWatchlist = (id: string) => {
    setWatchlist(
      (prev) =>
        prev.includes(id)
          ? prev.filter((coin) => coin !== id) // remove
          : [...prev, id], // add
    );
  };

  // Check if coin is already in watchlist (for UI control)
  const isInWatchlist = (id: string) => {
    return watchlist.includes(id);
  };

  // Clear entire watchlist
  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <AppContext.Provider
      value={{
        isSearching,
        setIsSearching,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        clearWatchlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
};
