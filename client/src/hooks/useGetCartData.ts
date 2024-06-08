import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/utils/product";
import { useAuthContext } from "./useAllContext";
import { useAxiosInstance } from "./useAxiosInstance";

export const useGetCartData = () => {
  const { axiosUserInstance, axiosProductInstance } = useAxiosInstance();
  const { isAuthenticated } = useAuthContext();
  const userId = localStorage.getItem("userID");
  const isReadyToCall = userId !== null && isAuthenticated;

  const fetchProducts = async () => {
    const response = await axiosProductInstance.get<{ products: IProduct[] }>(
      "/"
    );
    return response.data.products;
  };

  const fetchPurchasedItems = async () => {
    const response = await axiosProductInstance.get<{
      purchasedItems: IProduct[];
    }>(`/purchased-items/${userId}`);
    return response.data.purchasedItems;
  };

  const fetchAvailableMoney = async () => {
    const response = await axiosUserInstance.get<{ availableMoney: string }>(
      `/available-money/${userId}`
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
