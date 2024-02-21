import axios from "axios";
import { useEffect, useState } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
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

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products };
};
