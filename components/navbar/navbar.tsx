"use client";
import styles from "./navbar.module.css";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchTab from "../search/search";

const Navbar = () => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
    console.log("theme clicked");
  };

  useEffect(() => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h3>
            Crypto<span>Lite</span>
          </h3>
        </div>
        <div className={styles.navLinks}>
          <Link
            href="/"
            className={`${styles.navLink} ${pathname === "/" ? styles.activeLink : ""}`}
          >
            Home
          </Link>
          <Link
            href="/watchlist"
            className={`${styles.navLink} ${pathname === "/watchlist" ? styles.activeLink : ""}`}
          >
            Watchlist
          </Link>
          <div
            className={styles.searchInput}
            onClick={() => setShowSearch(true)}
          >
            <i className="bx bx-search" />
            <p>Search</p>
          </div>
          {darkMode ? (
            <i
              className={`bx bx-sun ${styles.darkModeIcon}`}
              onClick={toggleTheme}
            />
          ) : (
            <i
              className={`bx bx-moon ${styles.darkModeIcon}`}
              onClick={toggleTheme}
            />
          )}
        </div>
        <div className={styles.mobileMenu}>
          {darkMode ? (
            <i
              className={`bx bx-sun ${styles.darkModeIcon}`}
              onClick={toggleTheme}
            />
          ) : (
            <i
              className={`bx bx-moon ${styles.darkModeIcon}`}
              onClick={toggleTheme}
            />
          )}
        </div>
      </nav>
      <SearchTab showSearch={showSearch} setShowSearch={setShowSearch} />
    </>
  );
};

export default Navbar;
