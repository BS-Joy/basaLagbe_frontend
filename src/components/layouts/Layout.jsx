import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="dark:bg-[#33445B] dark:text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
