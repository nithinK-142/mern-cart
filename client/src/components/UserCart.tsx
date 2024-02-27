import { ShopContext } from "@/context/shop-context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { icons } from "@/assets/icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CreditCardIcon, XCircleIcon, XIcon } from "lucide-react";

const UserCart = () => {
  const { cartItemCount, clearCart } = useContext(ShopContext);
  const [cartLogs, setCartLogs] = useState([
    {
      id: 1,
      title: "item added to the cart",
    },
    {
      id: 2,
      title: "cart cleared",
    },
  ]);

  const clearCartLogs = () => {
    setCartLogs([]);
  };

  const removeLog = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    const updatedLogs = cartLogs.filter((log) => log.id !== id);
    setCartLogs(updatedLogs);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative w-6 h-6 cursor-pointer dark:fill-white">
            {icons.cart}
            {cartItemCount > 0 && (
              <span className="absolute px-1 text-sm text-black bg-yellow-400 rounded-full -right-2 -top-3">
                {cartItemCount}
              </span>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="relative text-center">
            Cart
            <div className="absolute right-1 top-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1">
              <XIcon
                className="w-4 h-4 cursor-pointer"
                onClick={clearCartLogs}
              />
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {cartLogs.length === 0 ? (
            <DropdownMenuGroup className="flex justify-center">
              <span className="py-1 text-center text-gray-500">
                cart is empty
              </span>
            </DropdownMenuGroup>
          ) : (
            cartLogs.map(({ title, id }) => (
              <DropdownMenuGroup key={id}>
                <DropdownMenuItem className="flex items-center justify-between">
                  <span>{title}</span>
                  <button
                    onClick={(e) => removeLog(e, id)}
                    className="inline-block p-1 bg-blue-600 hover:p-1.5 rounded-full cursor-pointer"
                  />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            ))
          )}

          <DropdownMenuSeparator />

          <DropdownMenuGroup className="flex justify-evenly">
            <DropdownMenuItem className="flex space-x-2">
              <Link to="/checkout">checkout</Link>
              <CreditCardIcon className="w-4 h-4 mr-2" />
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="flex space-x-2">
                <span> clear cart</span>
                <XCircleIcon className="w-4 h-4 mr-2" />
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will remove all of your cart
            items.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" variant={"destructive"} onClick={clearCart}>
              Clear cart!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserCart;
