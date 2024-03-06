import { useGetCartData } from "@/hooks/useGetCartData";
import { Product } from "./Product";
import Spinner from "@/components/Spinner";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import { SearchContext } from "@/context/search-context";

const Home = () => {
  const { products, productsLoading } = useGetCartData();
  const [displayCount, setDisplayCount] = useState(10);
  const { filteredProducts, searchTerm } = useContext(SearchContext);

  if (productsLoading) return <Spinner />;

  const handleLoadMore = () => setDisplayCount(displayCount + 10);

  return (
    <>
      <Search />
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.slice(0, displayCount).map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {products.length > displayCount && !searchTerm && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleLoadMore}
            className="text-white bg-blue-500 hover:bg-blue-500/90 dark:bg-blue-600 dark:hover:bg-blue-600/80"
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default Home;
