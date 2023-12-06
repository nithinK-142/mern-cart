import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";
import { IShopContext, ShopContext } from "../context/shop-context";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  const { headers } = useGetToken();

  const fetchProducts = async () => {
    try {
      setImageLoading(true);
      const fetchedProducts = await axios.get(
        `${import.meta.env.VITE_API_URL}/product`,
        {
          headers,
        }
      );
      setProducts(fetchedProducts.data.products);
      setTimeout(() => {
        setImageLoading(false);
      }, 2000);
    } catch (err) {
      console.log("ERROR: Something went wrong!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  return { imageLoading, products, fetchProducts };
};
