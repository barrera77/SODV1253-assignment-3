import { useState, useEffect } from "react";
import { mobileLogo, moviesLogo } from "../assets";
import { FaUser } from "react-icons/fa";
import Search from "./Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-wrapper py-5 border-b border-b-[#201f31]">
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
