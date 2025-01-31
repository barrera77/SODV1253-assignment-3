import Header from "../components/Header";
import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";

const HomePage = () => {
  return (
    <div>
      <div>
        <Header />
        <div>
          <NowPlaying />
          <TopRated />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
