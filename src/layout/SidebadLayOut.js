import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../common/Footer/Footer";
import Navbar from "../common/Navbar/Navbar";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import styles from "../style";
import { AuthContext } from "../context/AuthProvider";
const SidebadLayOut = () => {
  const sidebarLinks = [
    {
      name: "Home",
      path: "/home",
      icon: <AiOutlineHome />,
      id: 1,
    },
    {
      name: "Media",
      path: "/media",
      icon: <TfiLayoutMediaLeftAlt />,
      id: 2,
    },
    {
      name: "About",
      path: "/profile",
      icon: <CgProfile />,

      id: 3,
    },
  ];

  const { logOut } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <div className="lg:flex-row   flex flex-col-reverse justify-between">
        <div className="md:w-[70%] mx-auto w-[100%]">
          <div className="lg:hidden block">
            <Outlet />
          </div>
          <div className="hidden lg:block  ">
            <div className="drawer drawer-mobile">
              <input
                id="dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content border-r-[1px] border-black ">
                <Outlet />
              </div>
              <div className="drawer-side border-r-[1px] border-black">
                <label
                  htmlFor="dashboard-drawer"
                  className="drawer-overlay"
                ></label>
                <div className=" ">
                  <div className="  text-gray-900   py-4 h-auto">
                    {/* <!--left menu--> */}

                    <nav
                      className={`flex  flex-col gap-3 px-2 ${styles.paddingX}`}
                    >
                      {sidebarLinks.map((link) => (
                        <NavLink
                          key={link.id}
                          to={link.path}
                          className="group flex items-center px-2 py-2 leading-6 font-semibold rounded-full gap-2 text-xl
                     text-black hover:bg-gray-900 hover:text-white"
                        >
                          {link.icon}
                          {link.name}
                        </NavLink>
                      ))}
                      <NavLink
                        to="/login"
                        onClick={logOut}
                        className="group flex items-center px-2 py-2 leading-6 font-semibold rounded-full gap-2 text-xl
                     text-black hover:bg-gray-900 hover:text-white"
                      >
                        <RiLogoutBoxRLine />
                        Logout
                      </NavLink>
                      <NavLink to="allpost">
                        <button className="bg-gray-900 w-48 mt-5 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
                          All Post
                        </button>
                      </NavLink>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:max-w-lg lg:w-[30%] w-full px-5 mx-auto pt-5">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white border-[1px] border-black overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <BiSearch />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SidebadLayOut;
