import CoinClient from "./components/coinClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchData } from "@/lib/API interactions/fetchData";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const getCoinUrl = (id: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  try {
    await queryClient.query({
      queryKey: ["coin", id],
      queryFn: () => fetchData(getCoinUrl(id)),
      staleTime: 30 * 1000,
    });
  } catch (error: any) {
    if (error.status && error.status == 404) {
      notFound();
    }

    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinClient id={id} />
    </HydrationBoundary>
  );
};

export default Page;
