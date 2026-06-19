import { CoinDetails } from "../types/types";

export const fetchCoinDetails = async (id: string): Promise<CoinDetails> => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`,
    {
      headers: {
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
      },
    },
  );

  if (!res.ok) {
    const error = new Error(`Coin fetch failed: ${res.status}`) as any;
    error.status = res.status;
    throw error;
  }

  return await res.json();
};
