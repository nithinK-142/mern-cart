import { useContext } from "react";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { icons } from "@/assets/icons";
import { ModeToggle } from "./ModeToggle";
// import Notifications from "./Notifications";
import UserCart from "./UserCart";
import UserDropdown from "./UserDropdown";
import NavLinks from "./NavLinks";

const Header = () => {
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  return (
    <nav className="bg-white border border-gray-300 dark:border-opacity-20 dark:bg-black/70">
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
            <div className="flex items-center space-x-4 md:order-2 md:space-x-6 rtl:space-x-reverse">
              <ModeToggle />

              {/* <Notifications /> */}

              <UserCart />

              <UserDropdown />
            </div>
            <NavLinks />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
