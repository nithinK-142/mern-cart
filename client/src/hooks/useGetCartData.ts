import axios from "axios";
import { useEffect, useState } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";

export const useGetCartData = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setpurchasedItems] = useState<IProduct[]>([]);
  const { headers } = useGetToken();

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get(
        `${import.meta.env.VITE_API_URL}/product`,
        {
          headers,
        }
      );
      setProducts(fetchedProducts.data.products);
    } catch (err) {
      console.log("ERROR: Something went wrong!");
    }
  };

  const fetchPurchasedItems = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/product/purchased-items/${localStorage.getItem("userID")}`,
        { headers }
      );
      setpurchasedItems(res.data.purchasedItems);
    } catch (err) {
      console.log("ERROR: " + err);
    }
  };

  const fetchAvailableMoney = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/user/available-money/${localStorage.getItem("userID")}`,
        { headers }
      );
      setAvailableMoney(res.data.availableMoney);
    } catch (err) {
      console.log("ERROR: " + err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchPurchasedItems();
    fetchAvailableMoney();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    products,
    availableMoney,
    purchasedItems,
    fetchAvailableMoney,
    fetchPurchasedItems,
  };
};
