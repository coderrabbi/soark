import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer/Footer";
import Navbar from "../common/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const Main = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
