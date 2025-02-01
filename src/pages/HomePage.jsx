import Header from "../components/Header";
import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";
import About from "./About";

const HomePage = () => {
  return (
    <div>
      <div>
        <Header />
        {/* <div>
          <div className="my-5">
            <NowPlaying />
          </div>
          <div className="py-5 ">
            <TopRated />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
