import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { slides } from "../constants";
import { useState, useEffect } from "react";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [indicator, setIndicator] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIndicator((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIndicator((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="header-wrapper">
      <div className="relative w-full h-[90vh]">
        {/* slider images */}
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt="slide"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* slider image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#201f31] to-transparent z-20"></div>

        {/* slider indicators */}
        <div className="absolute z-50 flex -translate-x-1/2 bottom-28 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`w-3 h-3 rounded-full border border-white ${
                index === indicator ? "bg-yellow-500" : "bg-transparent"
              }`}
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
          ))}
        </div>

        {/* slider controls*/}
        <button
          onClick={prevSlide}
          className="absolute left-[5%] top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 border-2 border-yellow-500"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-[5%] top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 border-2 border-yellow-500"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
