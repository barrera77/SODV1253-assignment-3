import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="absolute inset-0 flex flex-col z-40">
        <Navbar />
      </div>
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Validate that `children` is a valid React node
Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
