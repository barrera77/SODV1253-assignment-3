import { useState, useEffect } from "react";
import { mobileLogo, moviesLogo } from "../assets";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import Search from "./Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storeMode = localStorage.getItem("darkMode");

    if (storeMode) {
      return JSON.parse(storeMode);
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.querySelector(".navbar-wrapper").classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.querySelector(".navbar-wrapper").classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="navbar-wrapper text-white py-5 border-b border-b-[#201f31]">
      <nav className=" w-[90%] m-auto">
        <div className="navbar-mobile sm:hidden flex items-center justify-between">
          <div className="ps-10">
            <div></div>
            <div className="xs:w-[80px]">
              <Link to="/" className="">
                <img src={mobileLogo} alt="logo" className="movies-logo" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-[1rem] justify-end">
            <div>
              <button className="mobile-btn-login">
                <FaUser className="text-2xl" />
              </button>
            </div>
            {/* <div>
              <button className="pt-1">
                {darkMode ? (
                  <FaMoon
                    className="moon-icon text-2xl text-white"
                    onClick={() => setDarkMode(!darkMode)}
                  />
                ) : (
                  <FaSun
                    className="sun-icon text-2xl text-yellow-500"
                    onClick={() => setDarkMode(!darkMode)}
                  />
                )}
              </button>
            </div> */}
          </div>
        </div>
        {/* desktop View */}
        <div className="navbar-content xs:hidden sm:flex justify-between items-center ">
          {/* left */}
          <div className="ps-8 w-[25%]">
            <div className="navbar-brand">
              <a href="/" className="">
                <img src={moviesLogo} alt="logo" className="movies-logo" />
              </a>
            </div>
          </div>
          {/* Middle */}
          <div className="sm:w-[55%]">
            <div>
              <Search />
            </div>
          </div>
          {/* Right */}
          <div className="flex items-center justify-end gap-[1rem] w-[15%]">
            <div className="sm:hidden lg:block">
              <button className="btn-login">Login</button>
            </div>
            <div className="lg:hidden">
              <button className="mobile-btn-login">
                <FaUser className="text-2xl" />
              </button>
            </div>
            {/* <div>
              <button className="pt-1">
                {darkMode ? (
                  <FaMoon
                    className="moon-icon text-2xl text-white"
                    onClick={() => setDarkMode(!darkMode)}
                  />
                ) : (
                  <FaSun
                    className="sun-icon text-2xl text-yellow-500"
                    onClick={() => setDarkMode(!darkMode)}
                  />
                )}
              </button>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
