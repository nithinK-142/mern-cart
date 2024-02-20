import {
  // CreditCard,
  // Keyboard,
  // Settings,
  // User,
  // Bell,
  // BellDotIcon,
  // BellElectric,
  // BellElectricIcon,
  LogOutIcon,
  CircleDollarSign,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { icons } from "@/assets/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const { availableMoney, isAuthenticated, logout } =
    useContext<IShopContext>(ShopContext);
  const user = sessionStorage.getItem("username");
  return (
    <nav className="border border-gray-300 bggray-400 dark:bg-white">
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
              <span className="w-6 h-6 cursor-pointer">{icons.bell}</span>
              <span className="w-6 h-6 cursor-pointer">{icons.cart}</span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{user}&apos;s Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <CircleDollarSign className="w-4 h-4 mr-2" />
                      <span className="font-medium opacity-90">
                        {availableMoney.toFixed(2)}
                      </span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Keyboard className="w-4 h-4 mr-2" />
                      <span>Keyboard shortcuts</span>
                    </DropdownMenuItem> */}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <LogOutIcon className="w-4 h-4 mr-2" />
                      <button onClick={logout}>Logout</button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col p-4 mt-4 font-medium transition-colors duration-500 rounded-lg md:p-0 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0">
                <li>
                  <Link to="/" className="nav__list" aria-current="page">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/purchased-items" className="nav__list">
                    Purchases
                  </Link>
                </li>
                <li>
                  <Link to="/checkout" className="nav__list">
                    Checkout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
