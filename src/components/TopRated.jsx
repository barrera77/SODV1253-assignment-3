import { useState, useEffect } from "react";
import { fetchData } from "../services/api-client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

const TOP_RATED_END_POINT = "/movie/top_rated?language=en-US&page=1";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTopRated = async (pageNumber) => {
    setLoading(true);
    try {
      const topRatedData = await fetchData(
        `${TOP_RATED_END_POINT}&page=${pageNumber}`
      );

      if (topRatedData.results && topRatedData.results.length > 0) {
        //uncomment this to append the next set of movies
        //setMovies((prevMovies) => [...prevMovies, ...topRatedData.results]);

        //to replace the current page with the next
        setMovies(topRatedData.results);

        setTotalPages(topRatedData.total_pages);
        setError(null);
        console.log(topRatedData.results);
      }
    } catch (err) {
      setError("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopRated(page);
    console.log("useEffect called");
  }, [page]);

  const loadNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="sm:container m-auto">
      <div className="text-start mb-4 xs:px-3">
        <h1 className="text-2xl font-bold">Top Rated Movies</h1>
      </div>

      {/* Top rated Movies */}
      <div className="px-3">
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

export default TopRated;
