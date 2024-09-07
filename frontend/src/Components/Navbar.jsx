import React, { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { FaCartPlus, FaMoon, FaUserSecret } from "react-icons/fa";
import musicLogo from "../images/budget-buddy-logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state?.userState?.userInfo);

  const dispatch = useDispatch();

  return (
    <div className=" bg-black text-white laptop:hidden">
      <div className="">
        <div className="navbar bg-base  px-5  section-container smallDekstop:px-0">
          <div className="navbar-start">
            <div className="dropdown smallDekstop:hidden  text-white rounded-xl">
              <div tabIndex={0} role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 py-10 shadow bg-white text-black"
              >
                <NavLinks />
              </ul>
            </div>

            <Link to={"/"}>
              {" "}
              <div className="hidden smallDekstop:flex justify-start items-center gap-1  ">
                <img src={musicLogo} alt="musiclogo" className="w-20 h-20 " />

                <h3 className=" text-lg xl:text-3xl font-extrabold font-sans bg-gradient-to-r from-pink-500  to-yellow-500 inline-block text-transparent bg-clip-text">
                  Budget Buddy
                </h3>
              </div>
            </Link>
          </div>
          <div className="navbar-center   ">
            <div className="btn btn-ghost text-xl hidden smallDekstop:flex">
              <NavLinks center={true} />
            </div>

            <Link to={"/"}>
              <div className="smallDekstop:hidden flex items-center gap-1">
                <img src={musicLogo} alt="musiclogo" className="w-10 h-10" />

                <h3 className="text-lg xl:text-3xl font-extrabold font-sans bg-gradient-to-r from-yellow-300  to-yellow-600 inline-block text-transparent bg-clip-text">
                  Budget Buddy
                </h3>
              </div>
            </Link>
          </div>
          <div className="navbar-end">
            <div>
              <button className="ml-4">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <FaUserSecret className="text-base smallTablet:text-2xl smallDekstop:text-3xl" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 text-black rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li className="text-base font-semibold uppercase mt-3 text-center">
                      <a>{user ? user?.username : "please login"}</a>
                    </li>

                    {user ? (
                      <li className="mt-4 cursor-pointer">
                        <a className="btn btn-secondary">Logout</a>
                      </li>
                    ) : (
                      <Link to={"/login"}>
                        <li className="mt-4 cursor-pointer">
                          <a className="btn btn-secondary">Login</a>
                        </li>
                      </Link>
                    )}
                  </ul>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
