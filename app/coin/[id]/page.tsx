"use client";
import CoinDetailLoader from "@/components/loading screens/coin detail loader/coinDetailLoader";
import { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(true);
  return <>{loading && <CoinDetailLoader />}</>;
};

export default page;
