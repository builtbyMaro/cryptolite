import { Coin } from "../types/types";

export const fetchCoins = async (page: number): Promise<Coin[]> => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=1h,7d`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
        },
      },
    );

    if (!res.ok) {
      const error = new Error(`HTTP ${res.status}`) as any;
      error.status = res.status;
      throw error;
    }
    return res.json();
  } catch (err: any) {
    if (err.status) throw err;

    const error: any = new Error("Network Error");
    throw error;
  }
};
