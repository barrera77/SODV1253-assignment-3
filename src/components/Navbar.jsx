import React from "react";
import { moviesLogo } from "../assets";
import { FaBars } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar-wrapper text-white">
      <nav>
        <div className="navbar-content flex justify-between items-center">
          <div>
            <button>
              <FaBars className="text-2xl text-white" />
            </button>
          </div>
          <div className="navbar-brand">
            <a href="/" className="">
              <img src={moviesLogo} alt="logo" className="movies-logo" />
            </a>
          </div>
          <div>
            <button className="btn-login">Login</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
