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
  BellIcon,
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
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const { availableMoney, isAuthenticated, cartItemCount, logout } =
    useContext<IShopContext>(ShopContext);
  const user = localStorage.getItem("username");
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

              <BellIcon className="w-6 h-6 mr-2 cursor-pointer" />
              <Link
                to="/checkout"
                className="relative w-6 h-6 cursor-pointer dark:fill-white"
              >
                {/* <span className="relative w-6 h-6 cursor-pointer dark:fill-white"> */}
                {icons.cart}
                {cartItemCount > 0 && (
                  <span className="absolute px-1 text-sm text-black bg-yellow-400 rounded-full -right-2 -top-3">
                    {cartItemCount}
                  </span>
                )}
                {/* </span> */}
              </Link>

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
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
