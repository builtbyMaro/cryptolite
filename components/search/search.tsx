"use client";
import styles from "./search.module.css";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type Props = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchTab = ({ showSearch, setShowSearch }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch) {
      searchRef.current?.focus();
    }
  }, [showSearch]);

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
              />
            </div>
            <i
              className={`bx bx-x ${styles.closeIcon}`}
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default SearchTab;
