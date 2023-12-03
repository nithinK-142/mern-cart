import { useContext, useState } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { CartItem } from "./CartItem";
import "./style.css";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.svg";

export const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const { cartItems, getCartItemCount, getTotalCartAmount, checkout } =
    useContext<IShopContext>(ShopContext);
  const hasItemsInCart = Object.keys(cartItems).length === 0;
  const { products } = useGetProducts();
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const handleButonClick = () => {
    setLoading(true);
    checkout();
  };
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
            {loading ? (
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
