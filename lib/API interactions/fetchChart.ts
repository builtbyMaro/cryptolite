export const fetchChart = async (id: string, timeFrame: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeFrame}`,
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
