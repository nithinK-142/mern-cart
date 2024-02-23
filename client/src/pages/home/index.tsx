import { useGetCartData } from "@/hooks/useGetCartData";
import { Product } from "./Product";
import Spinner from "@/components/Spinner";

const Home = () => {
  const { products, productsLoading } = useGetCartData();

  if (productsLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
