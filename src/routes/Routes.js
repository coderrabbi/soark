import { createBrowserRouter } from "react-router-dom";
import MiddleContainer from "../components/MiddleContainer/MiddleContainer";
import Profile from "../components/Profile";
import SidebadLayOut from "../layout/SidebadLayOut";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
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
    ],
  },
]);
