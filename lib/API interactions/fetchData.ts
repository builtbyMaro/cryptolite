export const fetchData = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
    },
  });

  if (!res.ok) {
    const error = new Error(`HTTP ${res.status}`) as any;
    error.status = res.status;
    throw error;
  }

  return await res.json();
};
