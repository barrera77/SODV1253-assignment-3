import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../services/api-client";
import MovieCard from "../components/MovieCard";

const MoviesByGenrePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreId = queryParams.get("genre");
  const genreName = queryParams.get("name");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genreId) return;

    fetchData(`/discover/movie?with_genres=${genreId}`)
      .then((data) => setMovies(data.results || []))
      .catch(() => setError("Failed to fetch movies"));
  }, [genreId]);

  return (
    <div className="container mt-[25%] sm:mt-[15%] lg:mt-[10%] xl:mt-[7.5%] m-auto">
      <div className="border-b border-gray-400 pt-6 pb-10 text-start">
        <p className="text-[1.25em]">Results for:</p>
        <h2 className="text-[45px] font-bold text-[#ffbf5e]">{genreName}</h2>
      </div>

      {error && <p className="text-red-500">{error}</p>}

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
    </div>
  );
};

export default MoviesByGenrePage;
