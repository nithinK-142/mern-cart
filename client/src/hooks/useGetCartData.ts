import { useQuery } from "react-query";
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { IProduct } from "@/models/interfaces";
import { useContext } from "react";
import { ShopContext } from "@/context/shop-context";

export const useGetCartData = () => {
  const { headers } = useGetToken();
  const { isAuthenticated } = useContext(ShopContext);

  const fetchProducts = async () => {
    const response = await axios.get<{ products: IProduct[] }>(
      `${import.meta.env.VITE_API_URL}/product`,
      {
        headers,
      }
    );
    return response.data.products;
  };

  const fetchPurchasedItems = async () => {
    const response = await axios.get<{ purchasedItems: IProduct[] }>(
      `${
        import.meta.env.VITE_API_URL
      }/product/purchased-items/${localStorage.getItem("userID")}`,
      { headers }
    );
    return response.data.purchasedItems;
  };

  const fetchAvailableMoney = async () => {
    const response = await axios.get<{ availableMoney: number }>(
      `${
        import.meta.env.VITE_API_URL
      }/user/available-money/${localStorage.getItem("userID")}`,
      { headers }
    );
    return response.data.availableMoney;
  };

  const { data: products, isLoading: productsLoading } = useQuery<IProduct[]>(
    "products",
    fetchProducts,
    {
      enabled: isAuthenticated,
    }
  );
  const { data: purchasedItems } = useQuery<IProduct[]>(
    "purchasedItems",
    fetchPurchasedItems,
    {
      enabled: isAuthenticated,
    }
  );
  const { data: availableMoney, isLoading: availableMoneyLoading } =
    useQuery<number>("availableMoney", fetchAvailableMoney, {
      enabled: isAuthenticated,
    });

  return {
    products: products || [],
    productsLoading,
    availableMoney: availableMoney || 0,
    availableMoneyLoading,
    purchasedItems: purchasedItems || [],
    fetchAvailableMoney,
    fetchPurchasedItems,
  };
};
