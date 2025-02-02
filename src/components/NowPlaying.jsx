import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SkeletonCard from "./SkeletonCard";

const NowPlaying = ({ movies }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [cardSize, setCardSize] = useState("");

  const rowRef = useRef(null);

  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "right"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const getCardSize = () => {
    const width = window.innerWidth;

    let size = "w-[132px]";

    if (width > 1280) {
      size = "w-[289.6px]";
    } else if (width > 1024) {
      size = "w-[238.4px]";
    } else if (width > 768) {
      size = "w-[187.2px]";
    } else if (width > 640) {
      size = "w-[177px]";
    } else if (width > 300) {
      size = "w-[197.333px]";
    }
    return size;
  };

  useEffect(() => {
    const updateCardSize = () => {
      const newCardSize = getCardSize();
      setCardSize(newCardSize);
    };

    updateCardSize();
    window.addEventListener("resize", updateCardSize);
    return () => window.removeEventListener("size", updateCardSize);
  }, []);

  return (
    <div className="container m-auto px-3 z-50">
      <div className="text-start mb-4">
        <h1 className="text-2xl font-bold">Now Playing</h1>
      </div>
      <div className="group relative">
        <button
          onClick={() => handleClick("left")}
          className="cursor-pointer absolute left-4 top-1/3 -translate-y-1/2 z-40 p-2 bg-black/50 rounded-full text-yellow-500 hover:bg-black/70 transition hover:scale-125 group-hover:opacity-100"
        >
          <FaChevronLeft size={20} />
        </button>
        <div
          ref={rowRef}
          className="grid grid-flow-col xs:gap-3 lg:gap-4 overflow-x-scroll scrollbar-hide py-4"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              moviesOrSeries={movie}
              className={`${cardSize}`}
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

NowPlaying.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      backdrop_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      overview: PropTypes.string,
    })
  ).isRequired,
};

export default NowPlaying;
