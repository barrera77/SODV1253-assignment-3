import PropTypes from "prop-types";
import {
  FaChevronLeft,
  FaChevronRight,
  FaClosedCaptioning,
  FaPlayCircle,
} from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaCalendar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = 3000;
  const intervalRef = useRef(null);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const startAutoSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, slideInterval);
  }, [slideInterval, slides.length]);

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  /*  useEffect(() => {
    startAutoSlide(); // Start sliding on mount

    return () => stopAutoSlide(); // Clear interval on unmount
  }, [startAutoSlide]); */

  return (
    <div className="header-wrapper">
      <div className="relative w-full xs:h-[65vh] md:h-[85vh]">
        {/* slider images */}
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={`https://image.tmdb.org/t/p/original${
              slide.backdrop_path || slide.poster_path
            }`}
            alt="slide"
            className={`hero-poster absolute inset-0 w-full h-full object-center transition-opacity duration-1000 ease-in-out  ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* slide info */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute xs:top-[50%] md:top-[40%] lg:top-[35%] left-[10%] z-50  transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <h2 className="xs:text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[5rem]">
              {slide.title}
            </h2>
            <div className="my-4 flex justify-between w-[250px]">
              <span className="flex gap-2 items-center xs:text-[14px] lg:text-[1rem]">
                <FaCalendar /> {slide.release_date}
              </span>
              <span className="flex gap-2 items-center xs:text-[14px] lg:text-[1rem]">
                <FaClosedCaptioning />
                {slide.original_language}
              </span>
            </div>
            <Link className="text-2xl w-[250px] flex gap-2 items-center py-2 justify-center rounded-[8px] border border-[#ffbf5e] bg-[#ffbf5e] hover:bg-[#201f31]">
              <FaPlayCircle /> Watch Now
            </Link>
          </div>
        ))}

        {/* slider image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#201f31] to-transparent z-40 xs:h-[65vh] md:h-[85vh]"></div>

        {/* slider indicators */}
        <div className="absolute z-50 flex -translate-x-1/2 xs:bottom-5 md:bottom-28 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`w-3 h-3 rounded-full border border-white ${
                index === currentSlide ? "bg-yellow-500" : "bg-transparent"
              }`}
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
          ))}
        </div>

        <div className="">
          <h2></h2>
        </div>

        {/* slider controls*/}
        <div
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
          className="xs:hidden"
        >
          <button
            onClick={prevSlide}
            className="absolute left-[3%] top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 border-2 border-yellow-500"
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
    </div>
  );
};

Header.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
      original_language: PropTypes.string,
    })
  ).isRequired,
};

export default Header;
