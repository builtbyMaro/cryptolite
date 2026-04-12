import { Coin } from "../types/types";

export const searchCoins = async (query: string): Promise<Coin[]> => {
  try {
    // Search Request
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`,
    );

    if (!res.ok) {
      const error: any = new Error(`HTTP ${res.status}`);
      error.status = res.status;
      throw error;
    }

    const data = await res.json();

    if (!data.coins.length) {
      return [];
    }

    // Extract IDs (limit to avoid rate issues)
    const ids = data.coins
      .slice(0, 20)
      .map((coin: any) => coin.id)
      .join(",");

    // Market data request
    const marketRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=24h`,
    );

    if (!marketRes.ok) {
      const error: any = new Error(`HTTP ${marketRes.status}`);
      error.status = marketRes.status;
      throw error;
    }

    return marketRes.json();
  } catch (err: any) {
    if (err.status) throw err;

    const error: any = new Error("Network Error");
    throw error;
  }
};
