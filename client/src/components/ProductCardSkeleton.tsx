import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(10)].map((_, index) => (
        <Card
          key={index}
          className="opacity-70 flex flex-col justify-between max-w-[80vw] md:max-w-[19rem]"
        >
          <Skeleton className="flex items-center justify-center pt-1 dark:opacity-80 min-h-56"></Skeleton>

          <CardHeader>
            <CardTitle>
              <Skeleton className="w-3/4 h-5" />
            </CardTitle>
            <Skeleton className="w-1/2 h-6" />

            <div className="flex flex-col gap-2">
              <Skeleton className="w-11/12 h-4" />
              <Skeleton className="w-11/12 h-4" />
            </div>
          </CardHeader>

          <CardFooter>
            <Button className="dark:opacity-90">
              <Skeleton className="w-20 h-6" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
