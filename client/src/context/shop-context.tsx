import { createContext, useContext, useState } from "react";
import { useGetCartData } from "@/hooks/useGetCartData";
import { IProduct } from "@/models/interfaces";
import axios from "axios";
import { useGetToken } from "@/hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ProductErrors } from "@/models/errors";
import { ErrorToast, SuccessToast } from "@/components/CustomToast";
import { AuthContext } from "./auth-context";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  cartItemCount: number;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  cartItems: { [itemId: string]: number };
  clearCart: () => void;
  logout: () => void;
  cartLogs: { id: number; title: string }[];
  addLog: (log: string) => void;
  resetCartLogs: () => void;
  removeLog: (id: number) => void;
  paymentDone: boolean;
  isExploding: boolean;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  cartItemCount: 0,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
  availableMoney: 0,
  purchasedItems: [],
  cartItems: {},
  clearCart: () => null,
  logout: () => null,
  cartLogs: [],
  addLog: () => null,
  resetCartLogs: () => null,
  removeLog: () => null,
  paymentDone: false,
  isExploding: false,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, _, removeCookie] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<{ [itemId: string]: number }>({});
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [cartLogs, setCartLogs] = useState<{ id: number; title: string }[]>([]);
  const [paymentDone, setPaymentDone] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const { setIsAuthenticated } = useContext(AuthContext);
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
  const afterCheckout = async () => {
    try {
      resetCartStates();
      setPaymentDone(true);
      setIsExploding(true);
      await fetchAvailableMoney();
      await fetchPurchasedItems();

      setTimeout(() => {
        navigate("/shop");
        setPaymentDone(false);
        setIsExploding(false);
        SuccessToast("Order placed 👍");
      }, 4000);
    } catch (error) {
      console.error("Error occurred during checkout:", error);
      setPaymentDone(false);
      setIsExploding(false);
      ErrorToast("An error occurred during checkout");
    }
  };

  const addLog = (log: string) => {
    const randomId = Math.floor(Math.random() * 1000000);
    setCartLogs([...cartLogs, { id: randomId, title: log }]);
  };

  const resetCartLogs = () => setCartLogs([]);

  const removeLog = (id: number) => {
    const updatedLogs = cartLogs.filter((log) => log.id !== id);
    setCartLogs(updatedLogs);
  };

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    else setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    setCartItemCount((prev) => prev + 1);
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    setCartItemCount((prev) => prev - 1);
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    setCartItemCount((prev) => prev - cartItems[itemId] + newAmount);
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

  const clearCart = () => {
    if (cartItemCount > 0) {
      setCartItems({});
      setCartItemCount(0);
      SuccessToast("Cleared cart items.");
    } else ErrorToast("No items in the cart!");
  };

  const resetCartStates = () => {
    setCartItems({});
    setCartItemCount(0);
    setCartLogs([]);
  };

  const checkout = async () => {
    const userId = localStorage.getItem("userID");

    if (userId === null) {
      ErrorToast("ERROR: Please Login Again!!");
      return;
    }

    const body = { customerID: userId, cartItems };
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/product/checkout`,
        body,
        {
          headers,
        }
      );
      afterCheckout();
    } catch (err) {
      let errorMessage: string = "";
      switch (err.response.data.type) {
        case ProductErrors.NO_PRODUCT_FOUND:
          errorMessage = "No product found";
          break;
        case ProductErrors.NO_AVAILABLE_MONEY:
          errorMessage = "Not enough credits";
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
    navigate("/");
    localStorage.clear();
    removeCookie("access_token");
    resetCartStates();
    SuccessToast("Successfully logged out!");
  };

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    cartItemCount,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
    availableMoney,
    purchasedItems,
    cartItems,
    clearCart,
    logout,
    cartLogs,
    addLog,
    resetCartLogs,
    removeLog,
    paymentDone,
    isExploding,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
