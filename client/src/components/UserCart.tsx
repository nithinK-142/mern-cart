import { ShopContext } from "@/context/shop-context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { icons } from "@/assets/icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
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

const UserCart = () => {
  const { cartItemCount, clearCart } = useContext(ShopContext);
  return (
    <Dialog>
      <HoverCard openDelay={100}>
        <HoverCardTrigger>
          <div className="relative w-6 h-6 cursor-pointer dark:fill-white">
            {icons.cart}
            {cartItemCount > 0 && (
              <span className="absolute px-1 text-sm text-black bg-yellow-400 rounded-full -right-2 -top-3">
                {cartItemCount}
              </span>
            )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="pb-2">
          <div className="border-b border-gray-300 dark:border-gray-100/50">
            <h2 className="pb-1 font-medium text-center">Cart</h2>
          </div>
          <div className="flex flex-col py-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="pl-2 text-sm">item added to cart</span>
              <span className="inline-block p-1 bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-100/50" />
          <div className="relative py-4 mt-2">
            <Button variant={"secondary"} className="absolute left-0 bottom-1">
              <Link to="/checkout">go to checkout</Link>
            </Button>
            <DialogTrigger asChild>
              <Button
                variant={"secondary"}
                className="absolute right-0 bottom-1"
              >
                Clear cart
              </Button>
            </DialogTrigger>
          </div>
        </HoverCardContent>
      </HoverCard>

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
