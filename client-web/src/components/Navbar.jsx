import { Link } from "react-router-dom";

export default function Navbar() {
  function logout() {
    localStorage.clear();
  }

  return (
    <div className="navbar bg-neutral ">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-2xl"
          >
            <li>
              <Link to="/">
                <p>Event</p>
              </Link>
            </li>
            <li>
              <Link to="/categories">
                <p>Category</p>
              </Link>
            </li>
            <li>
              <Link to="/admins">
                <p>Admins</p>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/">
          <p className="btn btn-ghost normal-case text-xl font-mono font-bold">
            Admin Console
          </p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1  font-bold font-mono text-lg">
          <li>
            <Link to="/">
              <p>Event</p>
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <p>Category</p>
            </Link>
          </li>
          <li>
            <Link to="/admins">
              <p>Admins</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar shadow-lg"
          >
            <div className="w-10 rounded-full">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.vectorstock.com%2Fi%2F1000x1000%2F23%2F70%2Fman-avatar-icon-flat-vector-19152370.jpg&f=1&nofb=1&ipt=9fa9f052aafe465ac7f7ec5400cc559bab9e65e3b5e67c8d105c0cdf9a3bf498&ipo=images" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-lg sm:menu-md dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <p className="justify-between">
                {"Halo, " + localStorage.getItem("username")}
              </p>
            </li>
            <li>
              <Link to="/login" onClick={logout}>
                {" "}
                <p className="text-red-600">Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
