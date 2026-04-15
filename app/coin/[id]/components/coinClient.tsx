"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CoinNav from "./coin nav/coinNav";
import { CoinDetails } from "@/lib/types/types";

type Props = {
  coin: CoinDetails;
};

const CoinClient = ({ coin }: Props) => {
  const coinName = coin.name;
  const coinSymbol = coin.symbol;
  const coinId = coin.id;

  const router = useRouter();

  // auto re-fetch
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "hidden") return;

      router.refresh();
    }, 60000);

    return () => clearInterval(interval);
  }, [router]);

  // re-fetch when user returns
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [router]);

  return (
    <>
      <CoinNav coinId={coinId} coinName={coinName} coinSymbol={coinSymbol} />
    </>
  );
};

export default CoinClient;
