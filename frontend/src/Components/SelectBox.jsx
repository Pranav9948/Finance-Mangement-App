import React from "react";

const SelectBox = ({ label, id, name, datas, value }) => {
  return (
    <div className="">
      <label className="form-control w-full max-w-full  ">
        <div className="mb-2">
          <span className="text-gray-600 font-sans font-semibold capitalize leading-5 pb-3 smallTablet:pb-0 ">
            {label}
          </span>
        </div>
        <select
          className="p-3 rounded-md border-2 border-gray-400"
          name={name}
          id={id}
          defaultValue=""
          value={value}
        >
          <option disabled selected value="" className="text-blue-700">
            Pick one
          </option>

          {datas?.map((data) => {
            return (
              <option key={data.id} value={data.type}>
                {data.type}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default SelectBox;
