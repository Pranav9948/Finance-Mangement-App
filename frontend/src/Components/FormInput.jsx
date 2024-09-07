import React from "react";

const FormInput = ({ label, type, name }) => {
  return (
    <div className="flex flex-col ">
      <label
        htmlFor={label}
        className="text-gray-600 font-sans font-bold capitalize leading-5 "
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="px-5 py-3 mt-2 rounded-lg border-[#98908B] border placeholder:text-[#98908B]"
      />
    </div>
  );
};

export default FormInput;
