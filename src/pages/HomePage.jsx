import Header from "../components/Header";
import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";
import About from "./About";
import { useState, useEffect } from "react";
import { fetchData } from "../services/api-client";

const NOW_PLAYING_END_POINT = "/movie/now_playing?language=en-US&page=1";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const response = await fetchData(NOW_PLAYING_END_POINT);
        if (response.results) {
          setMovies(response.results);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    getNowPlaying();
  }, []);

  const getSliderMovies = (count) => {
    const randomMovies = [...movies].sort(() => 0.5 - Math.random());
    return randomMovies.slice(0, count);
  };

  return (
    <div>
      <div>
        <div>
          <Header slides={getSliderMovies(5)} />
        </div>{" "}
        <div>
          <div className="my-5 z-50">
            <NowPlaying movies={movies} />
          </div>
          <div className="py-5 ">
            <TopRated />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
