import { fetchCoinDetails } from "@/lib/API interactions/fetchCoinDetails";
import CoinClient from "./components/coinClient";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  try {
    const coin = await fetchCoinDetails(id);

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
