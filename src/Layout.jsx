import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
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
