import walle from "@/assets/walle-empty-cart.png";
import { useContext, useState } from "react";
import { useGetCartData } from "@/hooks/useGetCartData";
import { IProduct } from "@/models/interfaces";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "@/components/CustomToast";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { icons } from "@/assets/icons";

export const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const {
    isAuthenticated,
    availableMoney,
    cartItems,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
  } = useContext<IShopContext>(ShopContext);
  const hasItemsInCart = Object.keys(cartItems).length > 0;
  const { products } = useGetCartData();
  const totalAmount = getTotalCartAmount();
  const hasCredits = availableMoney >= totalAmount;
  const navigate = useNavigate();
  const insufficientStockItems = Object.keys(cartItems).filter((itemId) => {
    const product = products.find((p) => p._id === itemId);
    return product && getCartItemCount(itemId) > product.stockQuantity;
  });

  const handleCheckout = () => {
    if (insufficientStockItems.length > 0) {
      ErrorToast("items in your cart do not have enough stock.");
      return;
    }

    setLoading(true);
    checkout();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  if (!isAuthenticated) {
    navigate("/");
    ErrorToast("You're not logged in, please log in.");
  }

  return (
    <div>
      {hasItemsInCart ? (
        <div className="flex flex-wrap justify-center my-4">
          {products.map((product: IProduct) => {
            if (getCartItemCount(product._id) !== 0) {
              return <CartItem key={product._id} product={product} />;
            }
            return null;
          })}
        </div>
      ) : (
        <div className="flex justify-center my-10">
          <img src={walle} className="select-none md:w-1/3" />
        </div>
      )}

      {totalAmount > 0 && (
        <div className="flex flex-col items-center justify-center my-4">
          <div className="flex items-center sm:text-xl">
            <span className="pt-1 sm:pr-2">Subtotal </span>
            <DollarSign className="pt-1 sm:w-6 sm:h-6" />
            <span className="text-3xl font-medium opacity-80">
              {totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex my-4 space-x-6">
            <Button onClick={() => navigate("/")}>Visit Shop</Button>
            <Button onClick={handleCheckout}>
              {loading && hasCredits ? (
                <span className="h-6">{icons.spinner}</span>
              ) : (
                "Checkout"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
