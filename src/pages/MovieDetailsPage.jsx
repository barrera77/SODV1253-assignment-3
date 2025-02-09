import { useState, useEffect } from "react";
import { deadpool } from "../assets";
import { fetchData } from "../services/api-client";
import MovieCard from "../components/MovieCard";

const MovieDetailsPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieId, setmovieId] = useState(null);

  const getSimilarMovies = async (id) => {
    setLoading(true);

    try {
      const similarMovies = await fetchData(`/movie/${id}/similar`);

      if (similarMovies.results && similarMovies.results.length > 0) {
        setMovies(similarMovies.results);
        setError(null);
        console.log(similarMovies.results);
      }
    } catch (err) {
      setError("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  /*   useEffect(() => {
    getSimilarMovies(movieId);
    console.log("useEffect called");
  }, [movieId]); */

  return (
    <div className="w-[90%] m-auto">
      <div className="h-[40vh]">Movie trailer</div>

      <div className="flex gap-5 w-[100%]">
        <div className="w-[20%]">
          <div className="w-[325px] h-[465px]">
            <img src={deadpool} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-[75%]">
          <div className="text-start w-[45%] border-b pb-7">
            <h2 className="text-[45px] font-bold">Movie Title</h2>
            <div className="flex gap-4 py-2">
              <span>year</span>
              <span>duration</span>
            </div>
            <div>
              <span>Genre</span>
              <p>Description</p>
              <p className="py-5">Subtitles: English</p>
              <p>Starring:</p>
              <p>Directed by:</p>
            </div>
          </div>

          <div className="mt-[2rem]">
            <h2 className="text-start font-bold text-[30px]">
              You May Also Like
            </h2>

            <div>
              <div>
                <div className="grid grid-flow-col xs:gap-3 lg:gap-4 overflow-x-scroll scrollbar-hide py-4">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} moviesOrSeries={movie} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
