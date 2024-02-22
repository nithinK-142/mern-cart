import { useContext } from "react";
import { IProduct } from "@/models/interfaces";
import { IShopContext, ShopContext } from "@/context/shop-context";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { CartToast } from "@/components/CustomToast";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, imageURL, stockQuantity } =
    props.product;
  const { addToCart } = useContext<IShopContext>(ShopContext);

  const handleAddToCart = () => {
    addToCart(_id);
    CartToast(productName);
  };
  return (
    <Card className="flex flex-col justify-between max-w-[80vw] md:max-w-max md:min-w-[14rem]">
      <div className="flex items-center justify-center pt-1 bg-white rounded-tl-xl rounded-tr-xl min-h-56">
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
      <CardFooter>
        {stockQuantity === 0 ? (
          <h4 className="text-lg font-semibold tracking-wide">OUT OF STOCK</h4>
        ) : (
          <Button onClick={handleAddToCart}>Add to cart</Button>
        )}
      </CardFooter>
    </Card>
  );
};
