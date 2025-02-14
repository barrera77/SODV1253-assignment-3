import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import About from "./pages/About";
import SearchResultsPage from "./pages/SearchResultsPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movieDetails/:id" element={<MovieDetailsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/genres" element={<MoviesByGenrePage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
