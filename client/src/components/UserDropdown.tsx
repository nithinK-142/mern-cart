import {
  // CreditCard,
  // Keyboard,
  // Settings,
  // User,
  // Bell,
  // BellDotIcon,
  // BellElectric,
  // BellElectricIcon,
  CircleDollarSign,
  LogOutIcon,
} from "lucide-react";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useGetCartData } from "@/hooks/useGetCartData";
import { Skeleton } from "./ui/skeleton";

const UserDropdown = () => {
  const { logout } = useContext<IShopContext>(ShopContext);
  const { availableMoney, availableMoneyLoading } = useGetCartData();
  const validMoney = !availableMoneyLoading && availableMoney > 0;
  const user = localStorage.getItem("username");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {user && <DropdownMenuLabel>{user}&apos;s Account</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {validMoney ? (
            <DropdownMenuItem>
              <CircleDollarSign className="w-4 h-4 mr-2" />
              <span className="font-medium opacity-90">
                {availableMoney.toFixed(2)}
              </span>
            </DropdownMenuItem>
          ) : (
            <Skeleton className="w-1/2 h-5 ml-1 bg-gray-300 dark:bg-gray-500" />
          )}
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
          <DropdownMenuItem onClick={logout}>
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
