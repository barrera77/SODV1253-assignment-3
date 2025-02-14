import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
        <Sidebar />
      </div>

      <main className="relative">{children}</main>

      <Footer />
    </>
  );
};

// Validate the props (children)
Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
