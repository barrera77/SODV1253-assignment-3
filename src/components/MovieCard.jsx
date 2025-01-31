import { FaClosedCaptioning, FaStar, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MovieCard({ moviesOrSeries }) {
  return (
    <div>
      <div key={moviesOrSeries.id} className="movie-card">
        <div className="movie-poster relative w-full">
          <Link to="">
            <img
              src={`https://image.tmdb.org/t/p/w500${
                moviesOrSeries.backdrop_path || moviesOrSeries.poster_path
              }`}
              alt="Movie Poster"
            />
          </Link>
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
            <h3 className="text-md">{moviesOrSeries.title}</h3>
          </Link>
          <div className="flex justify-between mt-3 text-sm">
            <span>{moviesOrSeries.release_date}</span>
            <span className="flex gap-2">
              <FaThumbsUp /> {moviesOrSeries.popularity}
            </span>
          </div>
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
};

export default MovieCard;
