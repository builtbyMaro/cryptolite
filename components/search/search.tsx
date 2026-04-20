"use client";
import styles from "./search.module.css";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SearchLoader from "../loading screens/search page loader/searchLoader";
import { useSearch } from "@/lib/hooks/useSearch";
import Error from "../error/error";
import SearchRow from "../search row/searchrow";

type Props = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchTab = ({ showSearch, setShowSearch }: Props) => {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { coins, loading, error, isCoolingDown, hasSearched } = useSearch({
    search,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (showSearch) {
      searchRef.current?.focus();
    }
  }, [showSearch]);

  const renderContent = () => {
    if (error) return <Error message={error} />;
    if (loading) return <SearchLoader />;
    if (!hasSearched)
      return <p className={styles.start}>Start typing to search</p>;
    if (coins.length === 0)
      return <Error message={`No results for "${search}"`} />;

    return coins.map((coin) => (
      <SearchRow coin={coin} key={coin.id} setShowSearch={setShowSearch} />
    ));
  };

  return (
    showSearch && (
      <div
        className={styles.searchContainer}
        onClick={() => setShowSearch(false)}
      >
        <div
          className={`${styles.searchTab} ${showSearch ? styles.show : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.searchNav}>
            <div className={styles.searchInput}>
              <i className="bx bx-search" />
              <input
                type="text"
                placeholder="Search coins..."
                className={styles.input}
                ref={searchRef}
                onChange={handleChange}
                value={search}
              />
            </div>
            <i
              className={`bx bx-x ${styles.closeIcon}`}
              onClick={() => setShowSearch(false)}
            />
          </div>
          <div className={styles.results}>{renderContent()}</div>
        </div>
      </div>
    )
  );
};

export default SearchTab;
