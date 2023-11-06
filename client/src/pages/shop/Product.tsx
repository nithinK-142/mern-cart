import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, imageURL, stockQuantity } =
    props.product;
  const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);
  const count = getCartItemCount(_id);

  return (
    <div className="product">
      <img src={imageURL} alt="" />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>

      <button className="add-to-cart-btn" onClick={() => addToCart(_id)}>
        Add to Cart {count > 0 && <>({count})</>}
      </button>
      <div className="stock-quantity">
        {stockQuantity === 0 && <h2>OUT OF STOCK</h2>}
      </div>
    </div>
  );
};
