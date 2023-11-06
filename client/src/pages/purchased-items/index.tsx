import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import "./style.css";

export const PurchasedItemsPage = () => {
  const { addToCart, getCartItemCount, purchasedItems } =
    useContext<IShopContext>(ShopContext);
  return (
    <div>
      <h1>Previously Purchased Items</h1>
      <div className="purchased-items">
        {purchasedItems.map((item) => {
          const count = getCartItemCount(item._id);
          return (
            <div className="item">
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
