import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
import TheSidebar from "./TheSideBar";

export default function Layout() {
  return (
    <>
      <div className="flex">
        {/* <Navbar /> */}
        <div className="fixed z-50 flex">
          <TheSidebar />
        </div>
        <div className="ml-40">
          <Outlet />
        </div>
      </div>
    </>
  );
}
