import { useContext } from "react";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Product } from "./Product";
// import "./style.css";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { Navigate } from "react-router-dom";
import Spinner from "@/components/Spinner";

const Home = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) return <Navigate to="/auth" />;

  if (products.length === 0) return <Spinner />;

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
