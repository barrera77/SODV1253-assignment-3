import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movieDetails" element={<MovieDetailsPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
