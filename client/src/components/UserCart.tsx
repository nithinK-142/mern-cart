import { ShopContext } from "@/context/shop-context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { icons } from "@/assets/icons";

const UserCart = () => {
  const { cartItemCount } = useContext(ShopContext);
  return (
    <Link
      to="/checkout"
      className="relative w-6 h-6 cursor-pointer dark:fill-white"
    >
      {icons.cart}
      {cartItemCount > 0 && (
        <span className="absolute px-1 text-sm text-black bg-yellow-400 rounded-full -right-2 -top-3">
          {cartItemCount}
        </span>
      )}
    </Link>
  );
};

export default UserCart;
