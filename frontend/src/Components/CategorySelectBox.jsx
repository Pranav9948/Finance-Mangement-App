import React, { useEffect, useState } from "react";
import { customFetch } from "../utils";

const CategorySelectBox = ({ onChange, selected }) => {
  const [allCategories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const { data } = await customFetch.get("/transactions/getcategories");

      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <label className="form-control w-full max-w-full">
        <div className="mb-2">
          <span className="text-gray-600 font-sans font-semibold capitalize leading-5 pb-3 smallTablet:pb-0 ">
            choose category of merchant
          </span>
        </div>
        <select
          className="select select-bordered"
          value={selected}
          name="category"
          id="categories"
          onChange={(e) => onChange(e.target.value)}
        >
          <option disabled selected>
            Pick one
          </option>
          {allCategories.map((category) => {
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
