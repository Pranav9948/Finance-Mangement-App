import React from "react";


const PrimaryButton = ({ bg, text, color, type }) => {
  return (
 
      <button
        type={type}
        className={`capitalize font-bold font-sans text-sm p-2 mobile:p-4 rounded-md shadow-md flex justify-center items-center w-full ${bg} ${color} `}
      >
        {text}
      </button>
    
  );
};

export default PrimaryButton;
