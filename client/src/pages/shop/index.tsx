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
  const { filteredAndSortedProducts } = useContext(SearchContext);

  const handleLoadMore = () => setDisplayCount(displayCount + 10);

  return (
    <>
      <Search />

      {!productsLoading ? (
        <>
          {filteredAndSortedProducts.length === 0 ? (
            <div className="my-20 text-xl font-semibold tracking-widest text-center text-red-500 opacity-70">
              NO PRODUCTS AVAILABLE.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedProducts
                .slice(0, displayCount)
                .map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          )}
        </>
      ) : (
        <ProductCardSkeleton />
      )}

      {filteredAndSortedProducts.length > displayCount && (
        <div className="flex justify-center mt-8">
          <Button
            variant={"outline"}
            onClick={handleLoadMore}
            className="animate-bounce"
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default Home;
