import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
import TheSidebar from "./TheSideBar";

export default function Layout() {
  return (
    <>
      <div className="flex overflow-hidden">
        {/* <Navbar /> */}
        <div className="z-50">
          <TheSidebar />
        </div>
        <div className="ml-20 h-screen flex flex-col">
          <Outlet />
        </div>
      </div>
    </>
  );
}
