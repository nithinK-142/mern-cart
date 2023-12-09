import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "./Product";
import "./style.css";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

export const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) return <Navigate to="/auth" />;

  if(products.length === 0) return <Spinner />

  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
