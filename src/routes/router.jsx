// import { createBrowserRouter } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Category from "../pages/Category";
import errorPage from "../components/errorPage";
import SkillDetail from "../pages/SkillDetail";
import Booking from "../pages/Booking";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
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
        element: (
          <ProtectedRoute>
            <SkillDetail></SkillDetail>
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      // {
      //   path: "/Register",
      //   element: <Register></Register>,
      // },
      {
        path: "/Book",
        element: <Booking></Booking>,
      },
      {
        path: "/AboutDetails",
        element: <h2>news layout</h2>,
      },
    ],
  },

  {
    path: "/*",
    Component: errorPage,
  },
]);
export default router;
