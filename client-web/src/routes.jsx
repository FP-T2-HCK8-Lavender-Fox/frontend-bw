import { createBrowserRouter, redirect } from "react-router-dom";
import EventPage from "./Views/EventPage";
// import AddEvent from "./Views/AddEvent";
import AddEventMain from "./components/AddEventMain";
import Chekpoint1 from "./components/Chekpoint1";
import Chekpoint2 from "./components/Chekpoint2";
import Chekpoint3 from "./components/Chekpoint3";
import Admin from "./Views/Admin";
import UserPage from "./Views/UserPage";
import Category from "./Views/Category";
import Login from "./Views/Login";
import DetailEvent from "./Views/DetailEvent";
import Map from "./Views/Map";
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
        element: <AddEventMain />,
      },
      {
        path: "/checkpoint-1",
        element: <Chekpoint1 />,
      },
      {
        path: "/checkpoint-2",
        element: <Chekpoint2 />,
      },
      {
        path: "/checkpoint-3",
        element: <Chekpoint3 />,
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
  {
    path: "/maps",
    element: <Map />,
  },
]);

export default router;
