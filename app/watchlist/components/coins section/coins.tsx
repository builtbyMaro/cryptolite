"use client";
import styles from "./coins.module.css";
import { useState } from "react";
import CoinPageLoader from "@/components/loading screens/coin page loader/coinPageLoader";
import Error from "@/components/error/error";

const CoinSection = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Error
        message={
          <span>
            Try clicking on the <i className="bx bx-star" /> icon to add coins
            to your watchlist
          </span>
        }
      />
      {loading && <CoinPageLoader />}
    </>
  );
};

export default CoinSection;
