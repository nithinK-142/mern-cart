import { useState } from "react";
import { icons } from "@/assets/icons";
import { ModeToggle } from "./ModeToggle";
import Notifications from "./Notifications";
import UserCart from "./UserCart";
import UserDropdown from "./UserDropdown";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navItems } from "@/utils/constants";
import { useAuthContext } from "@/hooks/useAllContext";

const Header = () => {
  const { isAuthenticated } = useAuthContext();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { pathname } = useLocation();
  const isNotRoot = pathname !== "/";
  const isAuth = pathname === "/auth";

  return (
    <header
      className={`${
        isNotRoot &&
        "fixed top-0 bg-white dark:bg-black/70 border border-gray-300 dark:border-opacity-20"
      } z-50 w-full`}
    >
      <div
        className={`flex flex-wrap items-center justify-center max-w-screen-xl p-2 mx-auto ${
          !isAuth && "justify-between"
        }`}
      >
        <Link
          to="/"
          className="flex items-center space-x-3 text-xl font-semibold rtl:space-x-reverse"
        >
          <span className="h-10">{icons.logo}</span>
          <h1>Cart</h1>
        </Link>

        {isAuthenticated ? (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="flex sm:hidden"
              onClick={() => setIsNavOpen((state) => !state)}
              aria-label="Toggle Navigation"
            >
              <Menu size={16} />
            </Button>

            <div className="flex items-center space-x-4 sm:order-2 md:space-x-6 rtl:space-x-reverse">
              <ModeToggle />

              <Notifications />

              <UserCart />

              <UserDropdown />
            </div>

            <nav className="items-center justify-between w-full sm:flex sm:w-auto sm:order-1">
              <ul className="hidden p-4 mt-4 font-medium rounded-lg sm:flex sm:p-0 sm:space-x-8 rtl:space-x-reverse sm:mt-0">
                {navItems.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="hover:opacity-65"
                      aria-current="page"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul
                className={`${
                  isNavOpen ? "flex flex-col" : "hidden"
                } sm:hidden text-right pt-2`}
              >
                {navItems.map(({ href, label }) => (
                  <li
                    key={label}
                    className={cn(
                      "hover:opacity-100 transition-opacity ease-in-out duration-200 pr-4 opacity-100 dark:hover:bg-neutral-900 hover:bg-neutral-300",
                      pathname === href
                        ? "opacity-100 dark:bg-neutral-900 bg-neutral-300"
                        : "opacity-80"
                    )}
                  >
                    <Link
                      to={href}
                      className="block py-2"
                      onClick={() => setIsNavOpen((state) => !state)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <Button className={isAuth ? "hidden" : "block"}>
            <Link to="/auth">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
