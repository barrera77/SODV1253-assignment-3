const Footer = () => {
  return (
    <div className="footer-wrapper py-[2rem] mt-3">
      <footer>
        <div className={`py-0 text-white px-[1rem]`}>
          <div className="lg:w-[30%] m-auto text-center xs:text-[12px] sm:text-[14px]">
            <p>
              &copy; 2024
              <strong>
                <span className="font-bold"> &lt; Д /&gt;</span>{" "}
              </strong>{" "}
              Manuel Alva.
            </p>
            <p className="text-[#6c757d]">
              This website was created for academic purposes only. Any
              resemblance to other website or businesses, real or fictional, is
              purely coincidential
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
