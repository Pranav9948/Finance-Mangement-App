import React from "react";
import musicLogo from "../images/budget-buddy-logo.png";
import { FaHome } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiFlyingTarget } from "react-icons/gi";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
  const navLinks = [
    {
      id: 1,
      link: "Overview",
      icon: <FaHome />,
      url: "/",
    },
    {
      id: 2,
      link: "Transactions",
      icon: <AiOutlineTransaction />,
      url: "/transactions",
    },
    {
      id: 3,
      link: "Budgets",
      icon: <GiFlyingTarget />,
      url: "/budgets",
    },
    {
      id: 4,
      link: "Pots",
      icon: <AiOutlineTransaction />,
      url: "/pots",
    },
    {
      id: 5,
      link: "Recurring Bills",
      icon: <AiOutlineTransaction />,
      url: "/recurring-bills",
    },
  ];

  const { pathname } = useLocation();

  return (
    <div className="h-full w-full">
      <div className="py-10 px-2  mx-auto ">
        <img src={musicLogo} alt="musiclogo" className="w-20 h-20 mx-auto " />

        <h3 className=" text-2xl text-center  mx-auto font-extrabold font-sans bg-gradient-to-r from-pink-500  to-yellow-500  text-transparent bg-clip-text">
          Budget Buddy
        </h3>

        <div className="flex flex-col items-start justify-start gap-10 py-16">
          {navLinks.map((links) => {
            return (
              <div
                className={`flex items-center justify-start gap-4 py-4 px-8 group rounded-md w-full hover:bg-blue-500 hover:text-black ${
                  links.url === pathname && "bg-white text-yellow-500"
                }`}
                key={links.id}
              >
                <div
                  className={`text-2xl font-bold text-white group-hover:text-white ${
                    links.url === pathname && " text-yellow-500"
                  }`}
                >
                  {links.icon}
                </div>
                <Link to={`${links.url}`}>
                  <div
                    className={`font-sans font-bold text-white text-base group-hover:text-white ${
                      links.url === pathname && " text-yellow-500"
                    }`}
                  >
                    {links.link}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
