import { CoinDetails } from "../types/types";
import { notFound } from "next/navigation";

export const fetchCoinDetails = async (id: string): Promise<CoinDetails> => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`,
    {
      headers: {
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
      },
      next: { revalidate: 60 },
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    const error = new Error(`Coin fetch failed: ${res.status}`) as any;
    error.status = res.status;
    throw error;
  }

  try {
    return await res.json();
  } catch {
    throw new Error("Invalid JSON response");
  }
};
