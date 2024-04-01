import { AuthContext, IAuthContext } from "@/context/auth-context";
import { ISearchContext, SearchContext } from "@/context/search-context";
import { IShopContext, ShopContext } from "@/context/shop-context";
import { useContext } from "react";

export const useAuthContext = () => useContext<IAuthContext>(AuthContext);

export const useShopContext = () => useContext<IShopContext>(ShopContext);

export const useSearchContext = () => useContext<ISearchContext>(SearchContext);
