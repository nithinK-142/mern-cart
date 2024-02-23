import walle from "@/assets/walle-not-found.png";
import { useContext } from "react";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "@/components/CustomToast";
import Product from "./Product";
import { useGetCartData } from "@/hooks/useGetCartData";
import Spinner from "@/components/Spinner";

export const PurchasedItemsPage = () => {
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  const { purchasedItems, purchasedItemsLoading } = useGetCartData();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
    ErrorToast("You're not logged in, please log in.");
  }

  return (
    <div>
      {!purchasedItemsLoading && purchasedItems.length === 0 ? (
        <div className="flex justify-center my-10">
          <img src={walle} className="select-none md:w-1/3" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center my-4">
          {purchasedItemsLoading ? (
            <Spinner />
          ) : (
            purchasedItems.map((item) => (
              <Product key={item._id} product={item} />
            ))
          )}
        </div>
      )}
    </div>
  );
};
