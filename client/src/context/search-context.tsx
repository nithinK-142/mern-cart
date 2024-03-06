import { useGetCartData } from "@/hooks/useGetCartData";
import { IProduct } from "@/models/interfaces";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { createContext, useState } from "react";

const filterValues = {
  wireless: false,
  audio: false,
  fitness: false,
  cameras: false,
  storage: false,
  virtualreality: false,
  homeautomation: false,
  portable: false,
  gaming: false,
  apple: false,
};

type FilterItem = {
  label: string;
  stateKey: keyof FilterState;
};

const filterItems: FilterItem[] = [
  { label: "Wireless", stateKey: "wireless" },
  { label: "Audio", stateKey: "audio" },
  { label: "Fitness", stateKey: "fitness" },
  { label: "Cameras", stateKey: "cameras" },
  { label: "Storage", stateKey: "storage" },
  { label: "Virtual Reality", stateKey: "virtualreality" },
  { label: "Home Automation", stateKey: "homeautomation" },
  { label: "Portable", stateKey: "portable" },
  { label: "Gaming", stateKey: "gaming" },
  { label: "Apple", stateKey: "apple" },
];

export interface ISearchContext {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProducts: IProduct[];

  filters: FilterState;
  filterItems: FilterItem[];

  handleFilterChange: (stateKey: keyof FilterState) => (value: Checked) => void;
  resetFilters: () => void;
}

const defaultVal: ISearchContext = {
  searchTerm: "",
  setSearchTerm: () => null,
  filteredProducts: [],

  filters: filterValues,
  filterItems: [],

  handleFilterChange: () => () => null,
  resetFilters: () => null,
};

export type Checked = DropdownMenuCheckboxItemProps["checked"];

export type FilterState = {
  [key: string]: Checked;
};

export const SearchContext = createContext<ISearchContext>(defaultVal);

export const SearchContextProvider = (props: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filters, setFilters] = useState<FilterState>(filterValues);

  const handleFilterChange =
    (stateKey: keyof FilterState) => (value: Checked) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [stateKey]: value,
      }));
    };

  const resetFilters = () => {
    setFilters(filterValues);
  };

  const { products } = useGetCartData();

  const filteredProducts = products.filter((product) => {
    const productName = product.productName.toLowerCase();
    const description = product.description.toLowerCase();
    const searchQuery = searchTerm.toLowerCase();

    const filterValues = Object.keys(filters).filter((key) => filters[key]);

    const matchesSearchTerm =
      productName.includes(searchQuery) || description.includes(searchQuery);

    const matchesFilter = filterValues.every((filter) =>
      product.tags.includes(filter)
    );

    return matchesSearchTerm && matchesFilter;
  });

  const contextValue: ISearchContext = {
    searchTerm,
    setSearchTerm,
    filteredProducts,

    filters,
    filterItems,

    handleFilterChange,
    resetFilters,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};
