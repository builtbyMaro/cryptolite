"use client";
import styles from "./topbtn.module.css";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {show && (
        <button onClick={scrollToTop} className={styles.btn}>
          <i className="bx bx-chevron-up" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
