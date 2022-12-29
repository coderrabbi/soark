import { createBrowserRouter } from "react-router-dom";
import MiddleContainer from "../components/MiddleContainer/MiddleContainer";
import Profile from "../components/Profile";
import SidebadLayOut from "../layout/SidebadLayOut";
import AllPost from "../pages/AllPost/AllPost";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PostDetails from "../pages/PostDetails/PostDetails";
import PrivetRoute from "./PrivetRoute/PrivetRoute";
export const routes = createBrowserRouter([
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
        element: <MiddleContainer />,
      },
      {
        path: "/home",
        element: <MiddleContainer />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/allpost",
        loader: () => fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/allpost`),
        element: <AllPost />,
      },
      {
        path: "/postdetails",
        loader: () => fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/allpost`),
        element: <PostDetails />,
      },
    ],
  },
]);
