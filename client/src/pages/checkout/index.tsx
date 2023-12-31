import { useContext, useState } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { CartItem } from "./CartItem";
import "./style.css";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.svg";
import toast from "react-hot-toast";

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
  const hasItemsInCart = Object.keys(cartItems).length === 0;
  const { products } = useGetProducts();
  const totalAmount = getTotalCartAmount();
  const hasMoney = availableMoney >= totalAmount;
  const navigate = useNavigate();
  const handleButonClick = () => {
    setLoading(true);
    checkout();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  if (!isAuthenticated) {
    navigate("/");
    toast.error("You're not logged in, please log in.");
  }

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>

      <div className="cart">
        {hasItemsInCart ? (
          <h2>No Items in the Cart</h2>
        ) : (
          products.map((product: IProduct) => {
            if (getCartItemCount(product._id) !== 0) {
              return <CartItem key={product._id} product={product} />;
            }
          })
        )}
      </div>

      {totalAmount > 0 && (
        <div className="checkout">
          <p>Subtotal : ${totalAmount.toFixed(2)}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={handleButonClick}>
            {loading && hasMoney ? (
              <span>
                Checkout
                <img id="checkout" src={spinner} alt="spinner" />
              </span>
            ) : (
              "Checkout"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
