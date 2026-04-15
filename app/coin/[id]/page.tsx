import { fetchCoinDetails } from "@/lib/API interactions/fetchCoinDetails";
import CoinClient from "./components/coinClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  console.log("Coin ID:", id);
  const coin = await fetchCoinDetails(id);

  return <CoinClient coin={coin} key={coin.id} />;
};

export default page;
