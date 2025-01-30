import { useState, useEffect } from "react";
import { fetchData } from "../services/api-client";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaClosedCaptioning,
  FaStar,
  FaThumbsUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { moviePosterDummy } from "../assets";

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
        setMovies((prevMovies) => [...prevMovies, ...topRatedData.results]);
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

  /*  useEffect(() => {
    getTopRated(page);
    console.log("useEffect called");
  }, [page]); */

  const loadNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container m-auto">
      <h1>Top Rated Movies</h1>

      <div>
        <div className="grid grid-cols-5 gap-5 pt-2">
          {movies &&
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster relative w-full">
                  <Link>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        movie.backdrop_path || movie.poster_path
                      }`}
                      alt="Movie Poster"
                    />
                  </Link>
                  <div className="absolute bottom-2 left-2 flex gap-3 w-[90%]">
                    <span className="flex gap-1  items-center bg-fuchsia-500 text-white p-1 rounded text-xs">
                      <FaClosedCaptioning /> {movie.original_language}
                    </span>
                    <span className="flex gap-1  items-center bg-fuchsia-500 text-white p-1 rounded text-xs">
                      <FaStar /> {movie.vote_average}
                    </span>
                  </div>
                </div>
                <div className="movie-details py-2 text-start">
                  <h3 className="text-md">{movie.title}</h3>
                  <div className="flex justify-between mt-3 text-sm">
                    <span>{movie.release_date}</span>
                    <span className="flex gap-2">
                      <FaThumbsUp /> {movie.popularity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* paginator */}
      <div className="w-full mt-[3rem]">
        <div className="flex justify-between items-center w-[50%] m-auto">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing page{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {movies.length}
            </span>{" "}
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
