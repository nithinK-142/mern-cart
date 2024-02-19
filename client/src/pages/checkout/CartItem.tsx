import { useContext } from "react";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { IProduct } from "@/models/interfaces";

interface Props {
  product: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, productName, price, imageURL } = props.product;

  const { addToCart, removeFromCart, updateCardItemCount, getCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);

  return (
    <div className="cart-item">
      <img src={imageURL} alt="" />
      <div className="description">
        <h3>{productName}</h3>
        <p>Price: ${price}</p>
      </div>
      <div className="count-handler">
        <button onClick={() => removeFromCart(_id)}>-</button>
        <input
          type="number"
          value={cartItemCount}
          onChange={(e) => updateCardItemCount(Number(e.target.value), _id)}
        />
        <button onClick={() => addToCart(_id)}>+</button>
      </div>
    </div>
  );
};
