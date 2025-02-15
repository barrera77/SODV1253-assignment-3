import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NowPlaying = ({ movies }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [cardSize, setCardSize] = useState(132); // Start with smallest width

  const rowRef = useRef(null);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "right"
          ? scrollLeft + clientWidth
          : scrollLeft - clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Dynamically update card size based on screen width
  const updateCardSize = () => {
    const width = window.innerWidth;
    let size = 132;

    if (width > 1280) size = 289.6;
    else if (width > 1024) size = 238.4;
    else if (width > 768) size = 187.2;
    else if (width > 640) size = 177;
    else if (width > 300) size = 197.333;

    setCardSize(size);
  };

  useEffect(() => {
    updateCardSize();
    window.addEventListener("resize", updateCardSize);
    return () => window.removeEventListener("resize", updateCardSize);
  }, []);

  return (
    <div className="w-full px-4 sm:px-5 z-50">
      <div className="text-start mb-4">
        <h1 className="text-2xl font-bold">Now Playing</h1>
      </div>

      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={() => handleClick("left")}
          className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/50 rounded-full text-yellow-500 hover:bg-black/70 transition hover:scale-125"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Movie Cards Container */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-4"
          style={{ scrollSnapType: "x mandatory" }} // Ensure smooth scrolling
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0"
              style={{ width: `${cardSize}px` }} // Dynamically apply size
            >
              <MovieCard moviesOrSeries={movie} />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => handleClick("right")}
          className={`cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/50 rounded-full text-yellow-500 hover:bg-black/70 transition hover:scale-125 ${
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
