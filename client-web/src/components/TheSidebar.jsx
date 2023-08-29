import Sidebar from "./sidebar";
import { SidebarItem } from "./sidebar";
import { Users, LayoutGrid, Lock, CalendarCheck } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TheSidebar() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <Sidebar>
      <Link to="/">
        {" "}
        <SidebarItem
          icon={<CalendarCheck size={20} />}
          text={"Event"}
          active={splitLocation[1] === "" ? true : false}
        />
      </Link>

      <Link to="/admins">
        <SidebarItem
          icon={<Lock size={20} />}
          text={"Admins"}
          active={splitLocation[1] === "admins" ? true : false}
        />
      </Link>
      <Link to="/categories">
        <SidebarItem
          icon={<LayoutGrid size={20} />}
          text={"Category"}
          active={splitLocation[1] === "categories" ? true : false}
        />
      </Link>
      <Link to="/users">
        <SidebarItem
          icon={<Users size={20} />}
          text={"Users"}
          active={splitLocation[1] === "users" ? true : false}
        />
      </Link>
    </Sidebar>
  );
}
