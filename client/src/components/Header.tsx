import { useContext, useState } from "react";
import { IShopContext, ShopContext } from "@/context/shop-context";
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

const Header = () => {
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 z-50 w-full bg-white border border-gray-300 dark:border-opacity-20 dark:bg-black/70">
      <div
        className={`flex flex-wrap items-center ${
          isAuthenticated ? "justify-between" : "justify-center"
        } max-w-screen-xl p-2 mx-auto`}
      >
        <h1 className="flex items-center space-x-3 text-xl font-semibold rtl:space-x-reverse">
          <span className="h-10">{icons.logo}</span>
          <span>Cart</span>
        </h1>
        {isAuthenticated && (
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
        )}
      </div>
    </header>
  );
};

export default Header;
