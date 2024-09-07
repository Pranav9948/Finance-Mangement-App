import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavLinks = ({ center }) => {
  const user = useSelector((state) => state?.user?.user);

  const links = [
    { id: 4, url: "transactions", text: "transactions" },
    { id: 2, url: "budgets", text: "Budgets" },
    { id: 3, url: "pots", text: "Pots" },
    { id: 5, url: "recurring-bills", text: "Bills" },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-10 ps-10 lg:ps-0 ">
      {links.map((link) => {
        const { id, url, text } = link;

        if ((url === "checkout" || url === "orders") && !user) return null;

        return (
          <div key={id} className="dekstop:ml-10">
            <NavLink
              to={url}
              key={id}
              className={`capitalize  font-semibold font-sans leading-5   text-lg w-full max-w-full ${
                center
                  ? "text-white bg-black"
                  : "bg-white text-black tracking-wide"
              }`}
            >
              {text}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
