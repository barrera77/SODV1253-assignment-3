import {
  FaCalendar,
  FaClosedCaptioning,
  FaPlayCircle,
  FaStar,
  FaThumbsUp,
} from "react-icons/fa";
import { Link, Links } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function MovieCard({ moviesOrSeries, className }) {
  const [imageUrl, setImageUrl] = useState("");

  const getDynamicMoviePosterUrl = (poster_path, backdrop_path) => {
    const width = window.innerWidth;

    let size = "w185";

    if (width > 640) {
      size = "w342";
    } else if (width > 768) {
      size = "w500";
    } else if (width > 1024) {
      size = "w780";
    }

    return `https://image.tmdb.org/t/p/${size}${poster_path || backdrop_path}`;
  };

  useEffect(() => {
    const updateUrl = () => {
      const newUrl = getDynamicMoviePosterUrl(
        moviesOrSeries.poster_path,
        moviesOrSeries.backdrop_path
      );
      setImageUrl(newUrl);
    };

    updateUrl();
    window.addEventListener("resize", updateUrl);

    return () => window.removeEventListener("size", updateUrl);
  }, [moviesOrSeries]);

  return (
    <div className={`${className}`}>
      <div
        key={moviesOrSeries.id}
        className="movie-card relative overflow-hidden"
      >
        <div className="movie-poster relative w-full overflow-hidden">
          <img src={imageUrl} alt="Movie Poster" className="responsive-img" />
          <div className="absolute bottom-2 left-2 flex gap-3 w-[90%]">
            <span className="flex gap-1  items-center bg-fuchsia-500 text-white p-1 rounded text-xs">
              <FaClosedCaptioning /> {moviesOrSeries.original_language}
            </span>
            <span className="flex gap-1  items-center bg-fuchsia-500 text-white p-1 rounded text-xs">
              <FaStar /> {moviesOrSeries.vote_average}
            </span>
          </div>
        </div>
        <div className="movie-details py-2 text-start">
          <Link to="">
            {" "}
            <h3 className="xs:truncate max-w-full text-md">
              {moviesOrSeries.title}
            </h3>
          </Link>
          <div className="flex justify-between mt-3 text-sm">
            <span className="flex gap-2">
              <FaCalendar />
              {moviesOrSeries.release_date
                ? moviesOrSeries.release_date.slice(0, 4)
                : "Unknown"}
            </span>
            <span className="flex gap-2">
              <FaThumbsUp /> {moviesOrSeries.popularity}
            </span>
          </div>
        </div>

        {/* Movie card overlay */}

        <div className="movie-card-overlay flex justify-center items-center bg-transparent">
          <Link to={"/movieDetails"}>
            <div className="flex flex-col justify-center items-center gap-5 ">
              <FaPlayCircle className="xs:text-[3rem] md:text-[4rem] lg:text-[5rem] text-yellow-500" />
              <span className="xs:text-[1rem] sm:text-xl font-semibold">
                Watch Now
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  moviesOrSeries: PropTypes.shape({
    id: PropTypes.number.isRequired,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
    original_language: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    popularity: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default MovieCard;
