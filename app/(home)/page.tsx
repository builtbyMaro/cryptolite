import Navbar from "@/components/navbar/navbar";
import BottomNav from "@/components/bottom nav/bottomnav";
import TableHeader from "@/components/table header/tableHeader";
import BackToTop from "@/components/back to top btn/topbtn";

const page = () => {
  return (
    <>
      <Navbar />
      <TableHeader />
      <BottomNav />
      <BackToTop />
    </>
  );
};

export default page;
