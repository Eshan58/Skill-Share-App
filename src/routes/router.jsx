import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Category from "../pages/Category";
import errorPage from "../components/errorPage";
import SkillDetail from "../pages/SkillDetail";
import Booking from "../pages/Booking";
// import errorPage from "../pages/errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "/category/:id",
        element: <Category></Category>,
      },
      {
        path: "/skill/:skillId",
        element: <SkillDetail></SkillDetail>,
      },
    ],
  },
  {
    path: "/Book",
    element: <Booking></Booking>,
  },
  {
    path: "/AboutDetails",
    element: <h2>news layout</h2>,
  },
  {
    path: "/*",
    Component: errorPage,
  },
]);
export default router;
