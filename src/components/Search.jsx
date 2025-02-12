import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  //get the use input
  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-wrapper w-[100%] ">
      <div className="relative w-[100%]">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchInput}
          id="default-search"
          className="block w-[100%] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search Movies, Series..."
          required
        />
        <button
          type="submit"
          className="sm:hidden lg:block btn-search focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-4 py-2 "
        >
          Search
        </button>
        <button type="submit" className="btn-mobile-search lg:hidden">
          <FaSearch className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default Search;
