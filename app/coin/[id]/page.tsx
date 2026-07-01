import CoinClient from "./components/coinClient";
import { notFound } from "next/navigation";
import { fetchData } from "@/lib/API interactions/fetchData";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;

    const coin = await fetchData(url);

    return <CoinClient coin={coin} key={coin.id} />;
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }

    if (error.status === 429) {
      throw new Error("RATE_LIMIT");
    }

    if (typeof error.status === "number" && error.status >= 500) {
      throw new Error("SERVER_ERROR");
    }

    throw new Error("NETWORK_ERROR");
  }
};

export default page;
