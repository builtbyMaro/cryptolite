"use client";
import styles from "./coins.module.css";
import { useState } from "react";
import CoinPageLoader from "@/components/loading screens/coin page loader/coinPageLoader";

const CoinSection = () => {
  const [loading, setLoading] = useState(true);

  return <>{loading && <CoinPageLoader />}</>;
};

export default CoinSection;
