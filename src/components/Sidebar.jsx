import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../services/api-client";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import { sideBarLinks } from "../constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData("/genre/movie/list?language=en")
      .then((data) => {
        if (data && data.genres) {
          setGenres(data.genres);
          console.log("Genres List:", data.genres);
        } else {
          console.log("No genres found in response!");
          setGenres([]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch movie genres:", error);
        setError("Failed to fetch movie genres");
      });
  }, []);

  const handleGenreButtonClick = (genre) => {
    closeSidebar();
    navigate(`/genres?genre=${genre.id}&name=${genre.name}`);
  };

  // Open Sidebar
  const openSidebar = () => {
    setIsOpen(true);
  };

  // Close Sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-950 opacity-80 z-[90]"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-[100] xs:w-[70%] sm:w-72 h-screen p-4 overflow-y-auto bg-[#201f31] opacity-90 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h5 className="text-end sm:text-center font-semibold uppercase text-gray-400 pt-5">
          Close Menu
        </h5>
        <button
          type="button"
          onClick={closeSidebar}
          className="absolute top-10 left-10"
        >
          <FaChevronLeft className="text-xl hover:text-[#ffbf5e]" />
        </button>

        {/* Sidebar Links */}
        <div className="py-4 overflow-y-auto mt-10">
          <ul className="space-y-2 font-medium">
            {sideBarLinks.map((link) => (
              <li
                key={link.id}
                className="block w-[100%] border-b p-2 border-[#FFFFFF5D] text-start cursor-pointer hover:text-[#ffbf5e]"
              >
                <Link to={link.href} className="w-[100%] ">
                  {link.title}
                </Link>
              </li>
            ))}
            <li className="text-start ps-2">Genres</li>

            <ul className="grid grid-cols-2 p-2 text-start list-none">
              {genres.map((genre) => (
                <li key={genre.id} className="hover:text-white">
                  <button onClick={() => handleGenreButtonClick(genre)}>
                    <span className="text-sm text-[#ffbf5e] hover:text-white">
                      {genre.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={openSidebar}
        className="btn-toggle fixed xs:top-5 xs:left-3 sm:top-7 md:left-5 lg:left-7 xl:left-9 2xl:left-16 z-40"
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Render Sidebar inside a Portal */}
      {ReactDOM.createPortal(
        sidebarContent,
        document.getElementById("sidebar-portal")
      )}
    </>
  );
};

export default Sidebar;
