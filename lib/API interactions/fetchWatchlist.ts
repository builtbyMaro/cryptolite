import { Coin } from "../types/types";

export const fetchWatchlistCoins = async (ids: string[]): Promise<Coin[]> => {
  if (!ids.length) return [];

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
        ",",
      )}&sparkline=false&price_change_percentage=1h,7d`,
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

    const data: Coin[] = await res.json();

    const orderedData = ids
      .map((id) => data.find((coin) => coin.id === id))
      .filter(Boolean) as Coin[];

    return orderedData;
  } catch (err: any) {
    if (err.status) throw err;

    const error: any = new Error("Network Error");
    throw error;
  }
};
