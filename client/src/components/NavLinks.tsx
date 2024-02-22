import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <nav
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-user"
    >
      <ul className="flex flex-col p-4 mt-4 font-medium rounded-lg md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
        <li>
          <Link to="/" className="hover:opacity-65" aria-current="page">
            Home
          </Link>
        </li>
        <li>
          <Link to="/purchased-items" className="hover:opacity-65">
            Purchases
          </Link>
        </li>
        <li>
          <Link to="/checkout" className="hover:opacity-65">
            Checkout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
