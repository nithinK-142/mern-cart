import { useContext } from "react";
import { useGetCartData } from "@/hooks/useGetCartData";
import { Product } from "./Product";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { products } = useGetCartData();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) return <Navigate to="/auth" />;

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
