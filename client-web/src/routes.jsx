import { createBrowserRouter, redirect } from "react-router-dom";
import EventPage from "./Views/EventPage";
import AddEvent from "./Views/AddEvent";
import Admin from "./Views/Admin";
import UserPage from "./Views/UserPage";
import Category from "./Views/Category";
import Login from "./Views/Login";
import DetailEvent from "./Views/DetailEvent";
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
        element: <EventPage />,
      },
      {
        path: "/admins",
        element: <Admin />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: "/events/:id",
        element: <DetailEvent />,
      },
      {
        path: "/add-events",
        element: <AddEvent />,
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
