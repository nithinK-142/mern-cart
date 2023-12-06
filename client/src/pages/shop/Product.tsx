import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import ImageSkeletonLoader from "../../components/ImageSkeletonLoader";
import { useGetProducts } from "../../hooks/useGetProducts";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, imageURL, stockQuantity } =
    props.product;
  const { imageLoading } = useGetProducts();
  const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);
  const count = getCartItemCount(_id);

  return (
    <div className="product">
      {imageLoading ? <ImageSkeletonLoader /> : <img src={imageURL} alt="" />}
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>

      {stockQuantity === 0 ? (
        <div className="stock-quantity">
          <h2>OUT OF STOCK</h2>
        </div>
      ) : (
        <button className="add-to-cart-btn" onClick={() => addToCart(_id)}>
          Add to Cart {count > 0 && <>({count})</>}
        </button>
      )}
    </div>
  );
};
