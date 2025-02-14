import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../services/api-client";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SearchResultsPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  const getSearchResultsByPage = async (pageNumber) => {
    try {
      const searchResults = await fetchData(
        `/search/movie?query=${searchQuery}&page=${pageNumber}`
      );

      if (searchResults.results && searchResults.results.length > 0) {
        setMovies(searchResults.results);
        setTotalPages(searchResults.total_pages);
      }
    } catch (err) {
      setError("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchResultsByPage(page);
  }, [page]);

  const loadNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mt-[25%] sm:mt-[15%] lg:mt-[10%] xl:mt-[7.5%] m-auto">
      <div className="border-b border-gray-400 pt-6 pb-10 text-start">
        <p className="text-[1.25em]">Results for:</p>
        <h2 className="text-[45px] font-bold text-[#ffbf5e]">{searchQuery}</h2>
      </div>

      {/* Search Results */}

      <div className="px-3 mt-[4rem]">
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : movies &&
              movies.map((movie) => (
                <MovieCard key={movie.id} moviesOrSeries={movie} />
              ))}
        </div>
      </div>
      {/* paginator */}
      <div className="w-full mt-[3rem]">
        <div className="flex justify-between items-center m-auto xs:flex-col xs:gap-4 md:flex-row md:justify-center">
          <span className="text-sm text-white">
            Showing page{" "}
            <span className="font-semibold text-yellow-500">{page}</span> of{" "}
            <span className="font-semibold text-yellow-500">{totalPages}</span>{" "}
            pages
          </span>
          <div className="inline-flex mt-2 xs:mt-0 z-40">
            <button className="py-[0.4rem] px-4 flex gap-3 items-center text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <FaArrowLeft /> Prev
            </button>
            {page < totalPages && (
              <button
                onClick={loadNextPage}
                className="py-[0.4rem] px-4 flex gap-3 items-center text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                disabled={loading}
              >
                Next
                <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
