"use client";
import styles from "./bottomnav.module.css";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SearchTab from "../search/search";

const BottomNav = () => {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <nav className={styles.bottomNav}>
        <Link
          href="/"
          className={`${styles.navLink} ${pathname === "/" && showSearch === false ? styles.activeLink : ""}`}
          onClick={() => showSearch && setShowSearch(false)}
        >
          <i className="bx bx-home" />
          <h3>Home</h3>
        </Link>
        <div
          className={`${styles.navLink} ${showSearch === true ? styles.activeLink : ""}`}
          onClick={() => setShowSearch(true)}
        >
          <i className="bx bx-search" />
          <h3>Search</h3>
        </div>
        <Link
          href="/watchlist"
          className={`${styles.navLink} ${pathname === "/watchlist" ? styles.activeLink : ""}`}
        >
          <i className="bx bx-star" />
          <h3>Watchlist</h3>
        </Link>
      </nav>
      <SearchTab showSearch={showSearch} setShowSearch={setShowSearch} />
    </>
  );
};

export default BottomNav;
