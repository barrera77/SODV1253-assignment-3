import { useState, useEffect } from "react";
import { moviesLogo } from "../assets";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import Search from "./Search";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
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
        <div className="navbar-mobile sm:hidden flex-1 items-center">
          <div>
            <div>
              <button>
                {toggle ? (
                  <FaWindowClose
                    className="text-2xl dark:text-white text:yellow-500"
                    onClick={() => setToggle(!toggle)}
                  />
                ) : (
                  <FaBars
                    className="text-2xl"
                    onClick={() => setToggle(!toggle)}
                  />
                )}
              </button>
            </div>
            <div>
              <a href="/" className="">
                <img src={moviesLogo} alt="logo" className="movies-logo" />
              </a>
            </div>
          </div>
        </div>
        {/* desktop View */}
        <div className="navbar-content xs:hidden sm:flex justify-between items-center ">
          <div className="flex items-center gap-[1.5rem]">
            <div>
              <button>
                {toggle ? (
                  <FaWindowClose
                    className="text-2xl text-white "
                    onClick={() => setToggle(!toggle)}
                  />
                ) : (
                  <FaBars
                    className="text-2xl"
                    onClick={() => setToggle(!toggle)}
                  />
                )}
              </button>
            </div>
            <div className="navbar-brand">
              <a href="/" className="">
                <img src={moviesLogo} alt="logo" className="movies-logo" />
              </a>
            </div>
          </div>
          <div className="w-[40%]">
            <div>
              <Search />
            </div>
          </div>
          <div className="flex items-center gap-[1.5rem]">
            <div>
              <button className="btn-login">Login</button>
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
