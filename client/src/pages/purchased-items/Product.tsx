import { CartAddToast } from "@/components/CustomToast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { IProduct } from "@/models/interfaces";
import { DollarSign } from "lucide-react";
import { useContext } from "react";

interface Props {
  product: IProduct;
}
const Product = (props: Props) => {
  const { _id, productName, price, imageURL } = props.product;
  const { addToCart, addLog } = useContext<IShopContext>(ShopContext);

  const handleAddToCart = () => {
    addToCart(_id);
    CartAddToast(productName);
    addLog(productName + " added to cart");
  };

  return (
    <Card className="flex justify-between items-center max-w-[80vw] md:max-w-sm md:min-w-[14rem] min-h-[12rem] m-4">
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
        <CardFooter>
          <Button onClick={handleAddToCart}>Buy Again</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Product;
