import { BellIcon, TrashIcon, XCircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ShopContext } from "@/context/shop-context";
import { useContext, useEffect, useState } from "react";

const Notifications = () => {
  const { cartLogs, resetCartLogs, removeLog } = useContext(ShopContext);

  const [isBellClicked, setIsBellClicked] = useState(false);

  const handleBellClick = () => setIsBellClicked(true);

  useEffect(() => {
    setIsBellClicked(false);
  }, [cartLogs]);

  return (
    <DropdownMenu onOpenChange={handleBellClick}>
      <DropdownMenuTrigger asChild>
        <div className="relative hidden cursor-pointer sm:block dark:fill-white">
          <BellIcon className="relative w-6 h-6" />
          {cartLogs.length > 0 && !isBellClicked && (
            <span className="absolute right-0 p-1 bg-blue-600 rounded-full -top-1" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="hidden w-56 sm:block">
        <DropdownMenuLabel className="relative text-center">
          Notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {cartLogs.length === 0 ? (
          <DropdownMenuGroup className="flex justify-center">
            <span className="py-1 text-center text-gray-500">
              No recent activity
            </span>
          </DropdownMenuGroup>
        ) : (
          cartLogs.map(({ title, id }) => (
            <DropdownMenuGroup key={id}>
              <DropdownMenuItem className="relative flex items-center justify-between group">
                <span onClick={(e) => e.stopPropagation()} className="w-[90%]">
                  {title}
                </span>
                <div className="flex items-center justify-center">
                  <div className="p-1 bg-blue-600 rounded-full group-hover:hidden" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLog(id);
                    }}
                    className="absolute hidden right-1 group-hover:block"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ))
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={resetCartLogs}
            className="flex justify-center space-x-2 cursor-pointer bg-stone-600 focus:bg-stone-600"
          >
            <span className="text-white">Clear all</span>
            <XCircleIcon className="w-4 h-4 text-white" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
