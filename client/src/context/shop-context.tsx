import { createContext, useEffect, useState } from "react";
import { useGetCartData } from "@/hooks/useGetCartData";
import { IProduct } from "@/models/interfaces";
import axios from "axios";
import { useGetToken } from "@/hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ProductErrors } from "@/models/errors";
import { ErrorToast, SuccessToast } from "@/components/CustomToast";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCardItemCount: (newAmount: number, itemId: string) => void;
  cartItemCount: number;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  cartItems: { [itemId: string]: number };
  logout: () => void;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCardItemCount: () => null,
  cartItemCount: 0,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
  availableMoney: 0,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  cartItems: {},
  logout: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props: { children: React.ReactNode }) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<{ [itemId: string]: number }>({});
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token && cookies.access_token !== ""
  );

  const {
    products,
    availableMoney,
    purchasedItems,
    fetchAvailableMoney,
    fetchPurchasedItems,
  } = useGetCartData();

  const { headers } = useGetToken();

  const navigate = useNavigate();

  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    setCartItemCount((prev) => prev + 1);
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCardItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo: IProduct | undefined = products.find(
          (product) => product._id === item
        );

        if (itemInfo) totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/product/checkout`,
        body,
        {
          headers,
        }
      );
      SuccessToast("Order placed 👍");
      setCartItemCount(0);
      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasedItems();
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";
      switch (err.response.data.type) {
        case ProductErrors.NO_PRODUCT_FOUND:
          errorMessage = "No product found";
          break;
        case ProductErrors.NO_AVAILABLE_MONEY:
          errorMessage = "Not enough money";
          break;
        case ProductErrors.NOT_ENOUGH_STOCK:
          errorMessage = "Not enough stock";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      ErrorToast("ERROR: " + errorMessage);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/auth");
    localStorage.clear();
    setCookies("access_token", null);
    setCartItems({});
    SuccessToast("Successfully logged out!");
  };

  useEffect(() => {
    if (!isAuthenticated || !localStorage.getItem("userID")) {
      navigate("/auth");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCardItemCount,
    cartItemCount,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
    availableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
    cartItems,
    logout,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
