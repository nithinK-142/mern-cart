import { Link } from "react-router-dom";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/purchased-items", label: "Purchases" },
  { href: "/checkout", label: "Checkout" },
];

const NavLinks = () => {
  return (
    <nav
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-user"
    >
      <ul className="flex flex-col p-4 mt-4 font-medium rounded-lg md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
        {navItems.map(({ href, label }) => (
          <li key={label}>
            <Link to={href} className="hover:opacity-65" aria-current="page">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
