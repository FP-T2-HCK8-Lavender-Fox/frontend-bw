import { createBrowserRouter, redirect } from "react-router-dom";
import Event from "./Views/Event";
import Admin from "./Views/Admin";
import Category from "./Views/Category";
import Login from "./Views/Login";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.access_token) throw redirect("/login");
      return null;
    },
    children: [
      {
        path: "/",
        element: <Event />,
      },
      {
        path: "/admins",
        element: <Admin />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
    ],
  },
  {
    path: "/login",
    loader: () => {
      if (localStorage.access_token) throw redirect("/");
      return null;
    },
    element: <Login />,
  },
]);

export default router;
