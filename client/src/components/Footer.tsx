const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4">
      <h2 className="font-sans text-base font-medium text-center opacity-50">
        <span className="tracking-wider">MERN</span> Cart &#169; {currentYear}.
        All Rights Reserved.
      </h2>
    </footer>
  );
};

export default Footer;
