import Navbar from "@/components/navbar/navbar";
import BottomNav from "@/components/bottom nav/bottomnav";
import TableHeader from "@/components/table header/tableHeader";
import CoinSection from "./components/coins section/coins";
import BackToTop from "@/components/back to top btn/topbtn";

const page = () => {
  return (
    <>
      <TableHeader />
      <CoinSection />
    </>
  );
};

export default page;
