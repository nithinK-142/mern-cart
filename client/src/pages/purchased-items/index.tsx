import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import "./style.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const PurchasedItemsPage = () => {
  const { isAuthenticated, addToCart, getCartItemCount, purchasedItems } =
    useContext<IShopContext>(ShopContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
    toast.error("You're not logged in, please log in.");
  }

  return (
    <div>
      <h1>Previously Purchased Items</h1>
      <div className="purchased-items">
        {purchasedItems.map((item) => {
          const count = getCartItemCount(item._id);
          return (
            <div key={item._id} className="item">
              <h3> {item.productName}</h3>
              <img src={item.imageURL} alt={item.productName} />
              <p>$: {item.price}</p>

              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(item._id)}
              >
                Purchase Again {count > 0 && <>({count})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
