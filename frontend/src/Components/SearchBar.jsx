import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = ({title}) => {

   

  return (
    <div className="relative flex items-center  w-full">
      <div className='w-full'>
        <input
          type="text"
          className="py-3 px-3 w-full  rounded-md shadow-xs border-2 border-[#98908B] my-1 bg-white placeholder:text-sm"
          placeholder={title}
        />
      </div>

      <div className="absolute right-4 hidden mobile:flex">
        <CiSearch className="text-lg font-semibold text-black" />
      </div>
    </div>
  );
}

export default SearchBar