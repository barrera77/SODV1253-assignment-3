import { useState, useEffect, useRef } from "react";
import { fetchData } from "../services/api-client";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieDetailsPage = () => {
  const { id } = useParams(); // Retrieve movie ID from URL

  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [cardSize, setCardSize] = useState("");
  const [isMoved, setIsMoved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    setLoading(true);

    // Fetch movie details
    fetchData(`/movie/${id}`)
      .then((data) => setMovieDetails(data))
      .catch(() => setError("Failed to fetch movie details"));

    // Fetch credits (Director, Cast)
    fetchData(`/movie/${id}/credits`)
      .then((data) => setCredits(data))
      .catch(() => setError("Failed to fetch the credits"));

    // Fetch movie videos (Trailers)
    fetchData(`/movie/${id}/videos`)
      .then((data) => setVideos(data.results))
      .catch(() => setError("Failed to fetch the videos"));

    // Fetch similar movies
    fetchData(`/movie/${id}/similar`)
      .then((data) => setMovies(data.results))
      .catch(() => setError("Failed to fetch similar movies"));

    setLoading(false);

    const updateCardSize = () => {
      const newCardSize = getCardSize();
      setCardSize(newCardSize);
    };

    updateCardSize();
    window.addEventListener("resize", updateCardSize);
    return () => window.removeEventListener("size", updateCardSize);
  }, [id]);

  // Function to format runtime from minutes to "1hr 39min"
  const formatDurationTime = (mins) => {
    if (!mins || mins <= 0) {
      return "Unknown";
    }
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}hr ${minutes}min`;
  };

  const getCardSize = () => {
    const width = window.innerWidth;

    let size = "w-[132px]";

    if (width > 1024) {
      size = "w-[238.4px]";
    } else if (width > 768) {
      size = "w-[185px]";
    } else if (width > 640) {
      size = "w-[170px]";
    } else if (width > 300) {
      size = "w-[197.333px]";
    }
    return size;
  };

  // Find the first YouTube trailer
  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (!movieDetails) {
    return (
      <p className="text-center text-lg text-gray-400">
        Loading movie details...
      </p>
    );
  }

  return (
    <div className="xs:mt-[30%] sm:mt-[15%] lg:mt-[10%] 2xl:mt-[5%]">
      <div className="xs:w-[100%] xs:px-2 md:px-6 xl:w-[90%]  m-auto ">
        {/* Movie Trailer Section */}
        <div className="w-full xs:h-[250px] sm:h-[360px] md:h-[450px] lg:h-[600px] 2xl:h-[90vh] flex justify-center items-center">
          {trailer ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-lg text-gray-400">No trailer available</p>
          )}
        </div>

        <div className="flex flex-col w-[100%] mt-5">
          <div className="flex gap-5 w-[100%]">
            {/* Movie Poster */}
            <div className="md:w-[30%] 2xl:w-[20%] xs:hidden md:block">
              <div className="md:w-full md:h-[90%] lg:w-[320px] 2xl:h-[465px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Movie Details */}
            <div className="w-full md:w-[65%] lg:w-[75%] lg:mt-3 text-sm md:text-[.95em] lg:text-[1em] 2xl:text-[1.25em] ">
              <div className="text-start 2xl:w-[60%] border-b mb-7 px-4 pb-3 lg:p-4">
                <h2 className="text-[30px] md:text-[45px] font-bold py-3">
                  {movieDetails.title}
                </h2>
                <div className="flex gap-4 py-2">
                  <span>
                    Release:{" "}
                    <span className="text-yellow-600">
                      {movieDetails.release_date
                        ? movieDetails.release_date.slice(0, 4)
                        : "Unknown"}
                    </span>
                  </span>
                  <span>
                    Duration:{" "}
                    <span className="text-yellow-600">
                      {formatDurationTime(movieDetails.runtime)}
                    </span>
                  </span>
                </div>
                <div>
                  <div className="flex gap-2">
                    <span>Genre: </span>
                    <ul className="flex gap-2 ps-0">
                      {movieDetails.genres?.map((genre, index) => (
                        <li key={index} className="text-yellow-600">
                          {genre.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="py-3 leading-7">{movieDetails.overview}</p>
                  <p className="py-5">
                    Subtitles:{" "}
                    <span className="text-yellow-600">
                      {movieDetails.original_language?.toUpperCase()}
                    </span>
                  </p>
                  <p>
                    Starring:{" "}
                    <span className="text-yellow-600">
                      {credits?.cast?.length > 0
                        ? credits.cast[0].name
                        : "Unknown"}
                    </span>
                  </p>
                  <p>
                    Directed by:{" "}
                    <span className="text-yellow-600">
                      {credits?.crew?.find((c) => c.job === "Director")?.name ||
                        "Unknown"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Similar Movies Section */}
          <div className="mt-[2rem]">
            <h2 className="text-start font-bold text-[30px]">
              You May Also Like
            </h2>

            {/*  <div>
              <div className="xl:grid flex flex-wrap xl:grid-flow-col gap-3 xl:gap-4 md:overflow-x-scroll scrollbar-hide py-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    moviesOrSeries={movie}
                    className={`${cardSize}`}
                  />
                ))}
              </div>
            </div> */}

            <div className="group relative">
              <button
                onClick={() => handleClick("left")}
                className="cursor-pointer absolute left-3 top-1/3 -translate-y-1/2 z-40 p-2 bg-black/50 rounded-full text-yellow-500 hover:bg-black/70 transition hover:scale-125 group-hover:opacity-100"
              >
                <FaChevronLeft size={20} />
              </button>
              <div
                ref={rowRef}
                className="xl:grid flex flex-wrap xl:grid-flow-col gap-3 xl:gap-4 md:overflow-x-scroll scrollbar-hide py-4"
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
                className={`cursor-pointer  absolute right-4 top-1/3 -translate-y-1/2 z-40 p-2 bg-black/50 rounded-full text-yellow-500 hover:bg-black/70 transition hover:scale-125 group-hover:opacity-100 ${
                  !isMoved && "hidden"
                }`}
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
