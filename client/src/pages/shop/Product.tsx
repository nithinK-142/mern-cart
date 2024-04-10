import { IProduct } from "@/utils/product";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, MinusIcon, PlusIcon } from "lucide-react";
import { CartAddToast, CartRemoveToast } from "@/components/CustomToast";
import { Input } from "@/components/ui/input";
import { useShopContext } from "@/hooks/useAllContext";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, imageURL, stockQuantity } =
    props.product;
  const {
    addToCart,
    addLog,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
  } = useShopContext();

  const handleAddToCart = () => {
    addToCart(_id);
    CartAddToast(productName);
    addLog(productName + " added to cart");
  };

  const handleRemoveFromCart = () => {
    removeFromCart(_id);
    CartRemoveToast(productName);
    addLog(productName + " removed from cart!");
  };

  const stockZero = stockQuantity === 0;

  const cartItemCount = getCartItemCount(_id);
  return (
    <Card
      className={`${
        stockZero && "opacity-70"
      } flex flex-col justify-between max-w-[80vw] md:max-w-max md:min-w-[14rem]`}
    >
      <div className="flex items-center justify-center pt-1 bg-white dark:opacity-80 rounded-tl-xl rounded-tr-xl min-h-56">
        <img
          src={imageURL}
          className="object-cover max-h-52"
          alt={productName}
        />
      </div>

      <CardHeader>
        <CardTitle>{productName}</CardTitle>
        <h2 className="flex items-center mt-1 text-2xl opacity-100">
          <DollarSign className="w-6 h-6 pt-1" />
          <span className="font-medium opacity-90">{price}</span>
        </h2>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {stockZero ? (
        <CardFooter className="flex items-center justify-center font-medium tracking-wider">
          OUT OF STOCK
        </CardFooter>
      ) : cartItemCount > 0 ? (
        <CardFooter className="flex space-x-2 font-bold">
          <Button onClick={handleAddToCart}>
            <PlusIcon className="w-4 h-6" />
          </Button>
          <Input
            type="number"
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
            className="w-10 sm:w-12"
          />
          <Button onClick={handleRemoveFromCart}>
            <MinusIcon className="w-4 h-6" />
          </Button>
        </CardFooter>
      ) : (
        <CardFooter>
          <Button onClick={handleAddToCart} className="dark:opacity-90">
            Add to cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
