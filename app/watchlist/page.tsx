import WatchlistHeader from "@/components/watchlist header/watchlistHeader";
import TableHeader from "@/components/table header/tableHeader";
import CoinSection from "./components/coins section/coins";

const page = () => {
  return (
    <>
      <WatchlistHeader />
      <TableHeader />
      <CoinSection />
    </>
  );
};

export default page;
