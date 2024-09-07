import React from "react";

const OverviewCard = ({ bg, color, text, amount }) => {
  return (
    <div className={` w-full max-w-full   group  cursor-pointer    `}>
      <div
        className={`bg-${bg} text-${color} group-hover:bg-${color} group-hover:text-${bg}  p-6 smallTablet:p-8 rounded-lg shadow-md group-hover:${
          bg == "black" ? "bg-white" : "bg-black"
        }`}
      >
        <h5
          className={`font-normal font-sans text-base leading-5 mb-3 capitalize text-${color} group-hover:text-${bg}  `}
        >
          {text}
        </h5>

        <h2
          className={`text-3xl  font-bold leading-10 text-${color} group-hover:text-${bg}  `}
        >
          {amount}
        </h2>
      </div>
    </div>
  );
};

export default OverviewCard;
