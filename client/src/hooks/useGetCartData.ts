import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGetToken } from "./useGetToken";
import { IProduct } from "@/models/interfaces";
import { useContext } from "react";
import { AuthContext, IAuthContext } from "@/context/auth-context";

export const useGetCartData = () => {
  const { headers } = useGetToken();
  const { isAuthenticated } = useContext<IAuthContext>(AuthContext);
  const userId = localStorage.getItem("userID");
  const isReadyToCall = userId !== null && isAuthenticated;

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
      `${import.meta.env.VITE_API_URL}/product/purchased-items/${userId}`,
      { headers }
    );
    return response.data.purchasedItems;
  };

  const fetchAvailableMoney = async () => {
    const response = await axios.get<{ availableMoney: string }>(
      `${import.meta.env.VITE_API_URL}/user/available-money/${userId}`,
      { headers }
    );
    return parseFloat(response.data.availableMoney);
  };

  const { data: products, isLoading: productsLoading } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled: isReadyToCall,
  });

  const { data: purchasedItems, isLoading: purchasedItemsLoading } = useQuery<
    IProduct[]
  >({
    queryKey: ["purchasedItems"],
    queryFn: fetchPurchasedItems,
    enabled: isReadyToCall,
  });

  const { data: availableMoney, isLoading: availableMoneyLoading } =
    useQuery<number>({
      queryKey: ["availableMoney"],
      queryFn: fetchAvailableMoney,
      enabled: isReadyToCall,
    });

  return {
    products: products || [],
    productsLoading,
    availableMoney: availableMoney || 0,
    availableMoneyLoading,
    purchasedItems: purchasedItems || [],
    purchasedItemsLoading,
    fetchAvailableMoney,
    fetchPurchasedItems,
  };
};
