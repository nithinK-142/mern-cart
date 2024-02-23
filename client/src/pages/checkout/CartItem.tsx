import { useContext } from "react";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { IProduct } from "@/models/interfaces";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { DollarSign, MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  product: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, productName, price, imageURL } = props.product;

  const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);

  return (
    <Card
      className="
      flex justify-between items-center max-w-[80vw] md:max-w-sm md:min-w-[14rem] min-h-[12rem] m-4"
    >
      <div className="flex items-center justify-center pt-1 bg-white rounded-md">
        <img
          src={imageURL}
          className="object-cover min-w-20"
          alt={productName}
        />
      </div>
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>{productName}</CardTitle>
          <h2 className="flex items-center mt-1 opacity-100 sm:text-2xl">
            <DollarSign className="w-4 h-4 pt-1 sm:w-6 sm:h-6" />
            <span className="font-medium opacity-90">{price}</span>
          </h2>
        </CardHeader>
        <CardFooter className="flex space-x-2 font-bold">
          <Button onClick={() => removeFromCart(_id)}>
            <MinusIcon className="w-4 h-6" />
          </Button>
          <Input
            type="number"
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
            className="w-10 sm:w-12"
          />
          <Button onClick={() => addToCart(_id)}>
            <PlusIcon className="w-4 h-6" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
