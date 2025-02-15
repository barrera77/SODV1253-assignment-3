import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../services/api-client";
import MovieCard from "../components/MovieCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MoviesByGenrePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreId = queryParams.get("genre");
  const genreName = queryParams.get("name");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFilteringResultsByPage = async (genre, pageNumber) => {
    setLoading(true);
    try {
      const filterByGenreResults = await fetchData(
        `/discover/movie?with_genres=${genre}&page=${pageNumber}`
      );

      if (
        filterByGenreResults.results &&
        filterByGenreResults.results.length > 0
      ) {
        setMovies(filterByGenreResults.results);
        setTotalPages(filterByGenreResults.total_pages);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (genreId) {
      setPage(1); // Reset page to 1 if the genre changes
      getFilteringResultsByPage(genreId, 1);
    }
  }, [genreId]);

  useEffect(() => {
    if (genreId) {
      getFilteringResultsByPage(genreId, page);
    }
  }, [page]);

  const loadNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="sm:container mt-[25%] sm:mt-[15%] lg:mt-[10%] xl:mt-[7.5%] m-auto z-[999]">
      <div className="px-[1rem] border-b border-gray-400 pt-6 pb-10 text-start">
        <p className="text-[1.25em]">Results for:</p>
        <h2 className="text-[35px] sm:text-[45px] font-bold text-[#ffbf5e]">
          {genreName}
        </h2>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Filtering Results */}
      <div className="px-3 mt-[4rem]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} moviesOrSeries={movie} />
            ))
          ) : (
            <p className="text-gray-400">No movies found for this genre.</p>
          )}
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
            <button
              className="py-[0.4rem] px-4 flex gap-3 items-center text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
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

export default MoviesByGenrePage;
