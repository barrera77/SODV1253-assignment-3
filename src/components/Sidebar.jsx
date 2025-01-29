import { useState } from "react";
import { FaBars, FaChevronLeft, FaWindowClose } from "react-icons/fa";
import { sideBarLinks } from "../constants";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  // Open Sidebar
  const openSidebar = () => {
    setIsOpen(true);
  };

  // Close Sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#201f318D] z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Toggle Button */}
      <button
        onClick={openSidebar}
        className="btn-toggle fixed xs:top-5 xs:left-3 sm:top-7 md:left-5 lg:left-7 xl:left-9 2xl:left-16 z-40"
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 xs:w-[70%] sm:w-64 h-screen p-4 overflow-y-auto bg-white dark:bg-[#201f31] opacity-90 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400 pt-5">
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
                <a href="/" className="w-[100%] ">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
