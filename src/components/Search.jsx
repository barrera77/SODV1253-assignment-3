import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="search-wrapper w-[100%] ">
      <div className="relative w-[100%]">
        <input
          type="search"
          id="default-search"
          className="block w-[100%] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search Movies, Series..."
          required
        />
        <button
          type="submit"
          className="sm:hidden btn-search focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-4 py-2 "
        >
          Search
        </button>
        <button className="btn-mobile-search">
          <FaSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Search;
