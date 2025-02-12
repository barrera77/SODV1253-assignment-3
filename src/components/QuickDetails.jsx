import ReactDOM from "react-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaPlayCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const QuickDetails = ({ movie, onClose }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  if (!movie) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[500px] lg:w-[900px] relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 hover:text-yellow-600 text-red-600"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>

        {/* Movie Image & Info */}
        <div className="flex flex-col items-center relative">
          {/* Skeleton Loader*/}
          <div
            className={`absolute w-full h-[450px] bg-gray-300 animate-pulse rounded-md ${
              isImageLoaded ? "hidden" : "block"
            }`}
          ></div>
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className={`w-full h-[450px] object-cover rounded-md transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* Movie Info */}
          <div className="absolute bottom-[30%] sm:top-[30%] left-0 sm:left-[5%] w-full">
            <h2 className=" text-center sm:text-start xs:text-[35px] xl:text-[50px] font-bold mt-4">
              {movie.title}
            </h2>
            <Link
              to={`/movieDetails/${movie.id}`}
              className="text-lg xl:text-2xl sm:w-[160px] xl:w-[250px] flex gap-2 items-center py-2 justify-center rounded-[8px] border border-[#ffbf5e] bg-[#ffbf5e] hover:bg-[#201f31]"
            >
              <FaPlayCircle /> Watch Now
            </Link>
            <div className="flex gap-4 py-4 px-2 text-sm sm:text-[1em] ">
              <span className="text-white">
                Release:{" "}
                <span className="text-yellow-600">
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : "Unknown"}
                </span>
              </span>
              <span className="text-white">
                Language:{" "}
                <span className="text-yellow-600">
                  {movie.original_language
                    ? movie.original_language.toUpperCase()
                    : "unknown"}
                </span>
              </span>
            </div>
          </div>

          {/* Overview */}
          <div className="mt-[2.5rem] border-t border-gray-500">
            <div className="p-3">
              <p className="text-gray-600">
                <span className="font-bold text-yellow-600">Overview:</span>{" "}
                {movie.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

QuickDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    original_language: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default QuickDetails;
