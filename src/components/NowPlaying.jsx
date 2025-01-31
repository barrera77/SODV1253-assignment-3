import { useState, useEffect, useRef } from "react";
import { fetchData } from "../services/api-client";
import MovieCard from "./MovieCard";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const NOW_PLAYING_END_POINT = "/movie/now_playing?language=en-US&page=1";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMoved, setIsMoved] = useState(false);

  const rowRef = useRef(null);

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

  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return (
    <div className="container m-auto">
      <div className="text-start">
        <h1 className="text-2xl font-bold">Now Playing</h1>
      </div>
      <div className="group relative">
        <button
          onClick={() => handleClick("left")}
          className="cursor-pointer  absolute left-4 top-1/3 -translate-y-1/2 z-40 p-2 bg-black/50 rounded-full text-yellow-500 hover:bg-black/70 transition hover:scale-125 group-hover:opacity-100"
        >
          <FaChevronLeft size={20} />
        </button>
        <div
          ref={rowRef}
          className="scrollbar-hide grid grid-flow-col gap-5 max-h-[600px] overflow-y-scroll scrollbar-hide p-4"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              moviesOrSeries={movie}
              className="w-[250px]"
            />
          ))}
        </div>
        <button
          onClick={() => handleClick("right")}
          className={`cursor-pointer  absolute right-4 top-1/3 -translate-y-1/2 z-40 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default NowPlaying;
