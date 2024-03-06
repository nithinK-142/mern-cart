import { useGetCartData } from "@/hooks/useGetCartData";
import { IProduct } from "@/models/interfaces";
import { createContext, useState } from "react";

export interface ISearchContext {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProducts: IProduct[];
}

const defaultVal: ISearchContext = {
  searchTerm: "",
  setSearchTerm: () => null,
  filteredProducts: [],
};

export const SearchContext = createContext<ISearchContext>(defaultVal);

export const SearchContextProvider = (props: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { products } = useGetCartData();

  const filteredProducts = products.filter((product) => {
    const productName = product.productName.toLowerCase();
    const description = product.description.toLowerCase();
    const searchQuery = searchTerm.toLowerCase();

    return (
      productName.includes(searchQuery) || description.includes(searchQuery)
    );
  });

  // const filteredProducts = products.filter((product) => {
  //   const productName = product.productName.toLowerCase();
  //   const description = product.description.toLowerCase();
  //   const searchQuery = searchTerm.toLowerCase();

  //   const matchesSearchTerm =
  //     productName.includes(searchQuery) || description.includes(searchQuery);

  //   const matchesFilters = Object.entries(filters).every(([key, value]) => {
  //     if (value) return product.tags.includes(key);
  //     return true;
  //   });

  //   return matchesSearchTerm && matchesFilters;
  // });

  const contextValue: ISearchContext = {
    searchTerm,
    setSearchTerm,
    filteredProducts,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};
