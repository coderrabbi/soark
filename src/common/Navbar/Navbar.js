import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import close from "../../assets/close.svg";
import menu from "../../assets/menu.svg";
import styles from "../../style";
import { AiOutlineHome } from "react-icons/ai";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AuthContext } from "../../context/AuthProvider";
const navLinks = [
  {
    name: "Home",
    path: "/",
    id: 1,
  },
  {
    name: "Media",
    path: "/media",
    id: 2,
  },
  {
    name: "About",
    path: "/profile",
    id: 3,
  },
  {
    name: "Contact",
    path: "/contact",
    id: 4,
  },
];
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

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { logOut } = useContext(AuthContext);
  return (
    <div>
      <div class="w-full lg:hidden block">
        <section
          id="bottom-navigation"
          class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
        />
        <section
          id="bottom-navigation"
          class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
        >
          <div id="tabs" class="flex justify-between">
            {sidebarLinks.map((link) => (
              <NavLink
                to={link.path}
                className="w-full flex flex-col justify-center items-center focus:text-teal-500 hover:text-gray-900  text-center pt-2 pb-1"
              >
                {link.icon}
                <span class="tab tab-home block text-xs"> {link.name}</span>
              </NavLink>
            ))}
            <NavLink
              onClick={logOut}
              to="/login"
              className="w-full flex flex-col justify-center items-center focus:text-teal-500 hover:text-gray-900  text-center pt-2 pb-1"
            >
              <RiLogoutBoxRLine />
              <span class="tab tab-home block text-xs">log out</span>
            </NavLink>
          </div>
        </section>
      </div>

      <div className="hidden lg:block">
        <nav className=" shadow-lg bg-gray-900 backdrop-blur-3xl navbar px-6 flex justify-between item-center py-3 w-full  ">
          <div className="logo_section">
            <Link to="/">
              <img
                src={logo}
                alt="social spark"
                className=" bg-white rounded-full w-10"
              />
            </Link>
          </div>
          <div className="menu_links flex items-center">
            <ul className={`${styles.flexStart} sm:flex hidden  `}>
              {navLinks.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`text-white list-none font-poppins font-normal cursor-pointer flex-1text-[16px] ${
                      index === navLinks.length - 1 ? `mr-0` : `mr-10`
                    }`}
                  >
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="toggle"
              className="w-[20px] object-contain h-[20px] cursor-pointer"
              onClick={() => {
                setToggle((prev) => !prev);
              }}
            />
            <div
              className={`${
                toggle ? "flex" : "hidden"
              } p-5 bg-black absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
            >
              <ul className="flex  flex-1 justify-center items-center flex-col">
                {navLinks.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`text-white list-none font-poppins font-normal cursor-pointer flex-1text-[16px] ${
                        index === navLinks.length - 1 ? `mr-0` : `mb-4`
                      }`}
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
