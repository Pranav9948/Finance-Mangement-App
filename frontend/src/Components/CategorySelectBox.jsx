import React, { useEffect, useState } from "react";

const CategorySelectBox = ({
  onChange,
  selected,
  allCategories,
  label,
  name,
}) => {
  return (
    <div>
      <label className="form-control w-full max-w-full">
        <div className="mb-2">
          <span className="text-gray-600 font-sans font-semibold capitalize leading-5 pb-3 smallTablet:pb-0 ">
            {label}
          </span>
        </div>
        <select
          className="select select-bordered"
        
          value={selected}
          name={name}
          id="categories"
          onChange={(e) => onChange(e.target.value)}
        >
          <option disabled selected>
            Pick one
          </option>
          {allCategories?.map((category) => {
            return (
              <option defaultValue={category} value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default CategorySelectBox;
