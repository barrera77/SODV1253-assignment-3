import { useState, useEffect } from "react";
import { fetchData } from "../services/api-client";
import MovieCard from "./MovieCard";

const NOW_PLAYING_END_POINT = "/movie/now_playing?language=en-US&page=1";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getNowPlaying = async () => {
    setLoading(true);
    try {
      const nowPlayingMovies = await fetchData(NOW_PLAYING_END_POINT);

      if (nowPlayingMovies.results && nowPlayingMovies.results.length > 0) {
        setMovies(nowPlayingMovies.results);
        setError(null);
        console.log(nowPlayingMovies.results);
      }
    } catch (err) {
      setError("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  /*  useEffect(() => {
    getNowPlaying();
  }, []); */

  return (
    <div className="container m-auto">
      <div className="text-start">
        <h1 className="text-2xl font-bold">Now Playing</h1>
      </div>
      <div>
        <div className="flex gap-5 py-2">
          {movies &&
            movies.map((movie) => (
              <MovieCard key={movie.id} moviesOrSeries={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
