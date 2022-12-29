import { createBrowserRouter } from "react-router-dom";
import MiddleContainer from "../components/MiddleContainer/MiddleContainer";
import Profile from "../components/Profile";
import SidebadLayOut from "../layout/SidebadLayOut";
import AllPost from "../pages/AllPost/AllPost";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/NoFound/NotFound";
import PostDetails from "../pages/PostDetails/PostDetails";
import PrivetRoute from "./PrivetRoute/PrivetRoute";
export const routes = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <PrivetRoute>
        <SidebadLayOut />
      </PrivetRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivetRoute>
            <MiddleContainer />
          </PrivetRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <PrivetRoute>
            <MiddleContainer />
          </PrivetRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/allpost",
        loader: () => fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/allpost`),
        element: (
          <PrivetRoute>
            <AllPost />
          </PrivetRoute>
        ),
      },
      {
        path: "/postdetails/:id",

        loader: ({ params }) =>
          fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/allpost/${params.id}`
          ),
        element: (
          <PrivetRoute>
            <PostDetails />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
