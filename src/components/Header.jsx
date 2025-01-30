import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import { kravenMovie } from "../assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="relative w-full h-[90vh]">
        <img
          src={kravenMovie}
          alt="slide"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#201f31] to-transparent z-20"></div>

        <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
          <FaChevronLeft size={20} />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
