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

const UserProfile = () => {
  const { availableMoney, logout } = useContext<IShopContext>(ShopContext);
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
  );
};

export default UserProfile;
