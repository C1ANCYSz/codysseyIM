import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="bg-footer-800 font-body grid min-h-screen grid-rows-[auto_1fr_auto] overflow-x-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
