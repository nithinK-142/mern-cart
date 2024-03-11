import { useGetCartData } from "@/hooks/useGetCartData";
import { Product } from "./Product";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import { SearchContext } from "@/context/search-context";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const Home = () => {
  const { productsLoading } = useGetCartData();
  const [displayCount, setDisplayCount] = useState(10);
  const { filteredProducts } = useContext(SearchContext);

  const handleLoadMore = () => setDisplayCount(displayCount + 10);

  return (
    <>
      <Search />

      {!productsLoading ? (
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.slice(0, displayCount).map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <ProductCardSkeleton />
      )}

      {filteredProducts.length > displayCount && (
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
