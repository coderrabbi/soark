import { createBrowserRouter } from "react-router-dom";
import MiddleContainer from "../components/MiddleContainer/MiddleContainer";

import Profile from "../components/Profile";

import SidebadLayOut from "../layout/SidebadLayOut";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <SidebadLayOut />,
    children: [
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
