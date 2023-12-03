import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { CartItem } from "./CartItem";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const { cartItems, getCartItemCount, getTotalCartAmount, checkout } =
    useContext<IShopContext>(ShopContext);
    const hasItemsInCart = Object.keys(cartItems).length === 0;
  const { products } = useGetProducts();
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
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
          <button onClick={checkout}>Checkout</button>
        </div>
      )}
    </div>
  );
};
