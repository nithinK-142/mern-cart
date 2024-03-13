import { useGetCartData } from "@/hooks/useGetCartData";
import { IProduct } from "@/models/interfaces";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { icons } from "lucide-react";
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

const sortValues = {
  wireless: false,
  audio: false,
  fitness: false,
  cameras: false,
};

type FilterItem = {
  label: string;
  stateKey: keyof FilterState;
  iconName: keyof typeof icons;
};

const filterItems: FilterItem[] = [
  { label: "Wireless", stateKey: "wireless", iconName: "Wifi" },
  { label: "Audio", stateKey: "audio", iconName: "Volume2" },
  { label: "Fitness", stateKey: "fitness", iconName: "Activity" },
  { label: "Cameras", stateKey: "cameras", iconName: "Camera" },
  { label: "Storage", stateKey: "storage", iconName: "Database" },
  {
    label: "Virtual Reality",
    stateKey: "virtualreality",
    iconName: "Glasses",
  },
  {
    label: "Home Automation",
    stateKey: "homeautomation",
    iconName: "Home",
  },
  { label: "Portable", stateKey: "portable", iconName: "ShoppingBag" },
  { label: "Gaming", stateKey: "gaming", iconName: "Gamepad" },
  { label: "Apple", stateKey: "apple", iconName: "Apple" },
];

type SortItem = {
  label: string;
  stateKey: keyof FilterState;
  iconName: keyof typeof icons;
};

const sortItems: SortItem[] = [
  { label: "Ascending", stateKey: "ascending", iconName: "ArrowUpAZ" },
  { label: "Descending", stateKey: "descending", iconName: "ArrowDownAZ" },
  {
    label: "Low to High",
    stateKey: "lowtohigh",
    iconName: "ArrowUpNarrowWide",
  },
  {
    label: "High to Low",
    stateKey: "hightolow",
    iconName: "ArrowDownNarrowWide",
  },
];

export interface ISearchContext {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredAndSortedProducts: IProduct[];

  filters: FilterState;
  filterItems: FilterItem[];

  sorting: FilterState;
  sortItems: SortItem[];

  handleFilterChange: (stateKey: keyof FilterState) => (value: Checked) => void;
  handleSortChange: (stateKey: keyof FilterState) => (value: Checked) => void;
  resetFilters: () => void;
  resetSorting: () => void;
}

const defaultVal: ISearchContext = {
  searchTerm: "",
  setSearchTerm: () => null,
  filteredAndSortedProducts: [],

  filters: filterValues,
  filterItems: [],

  sorting: sortValues,
  sortItems: [],

  handleFilterChange: () => () => null,
  handleSortChange: () => () => null,
  resetFilters: () => null,
  resetSorting: () => null,
};

export type Checked = DropdownMenuCheckboxItemProps["checked"];

export type FilterState = {
  [key: string]: Checked;
};

export const SearchContext = createContext<ISearchContext>(defaultVal);

export const SearchContextProvider = (props: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filters, setFilters] = useState<FilterState>(filterValues);
  const [sorting, setSorting] = useState<FilterState>(sortValues);

  const handleFilterChange =
    (stateKey: keyof FilterState) => (value: Checked) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [stateKey]: value,
      }));
    };

  const handleSortChange =
    (stateKey: keyof FilterState) => (value: Checked) => {
      setSorting((prevSorting) => {
        let updatedSorting = { ...prevSorting };

        if (stateKey === "ascending" || stateKey === "descending") {
          updatedSorting = {
            // ...updatedSorting,
            ascending: stateKey === "ascending" ? value : false,
            descending: stateKey === "descending" ? value : false,
            lowtohigh: false,
            hightolow: false,
          };
        } else if (stateKey === "lowtohigh" || stateKey === "hightolow") {
          updatedSorting = {
            ...updatedSorting,
            lowtohigh: stateKey === "lowtohigh" ? value : false,
            hightolow: stateKey === "hightolow" ? value : false,
          };
        }

        return updatedSorting;
      });
    };

  const resetFilters = () => setFilters(filterValues);

  const resetSorting = () => setSorting(sortValues);

  const { products } = useGetCartData();

  const filteredAndSortedProducts = products
    .filter((product) => {
      const productName = product.productName.toLowerCase();
      const description = product.description.toLowerCase();
      const searchQuery = searchTerm.toLowerCase();

      const filterValuesArray = Object.keys(filters).filter(
        (key) => filters[key]
      );

      const matchesSearchTerm =
        productName.includes(searchQuery) || description.includes(searchQuery);

      const matchesFilter = filterValuesArray.every((filter) =>
        product.tags.includes(filter)
      );

      return matchesSearchTerm && matchesFilter;
    })
    .sort((a, b) => {
      const sortingKeys = Object.keys(sorting).filter((key) => sorting[key]);
      let comparisonResult = 0;

      sortingKeys.forEach((sortingKey) => {
        switch (sortingKey) {
          case "ascending":
            comparisonResult = a.productName.localeCompare(b.productName);
            break;
          case "descending":
            comparisonResult = b.productName.localeCompare(a.productName);
            break;
          case "lowtohigh":
            comparisonResult = a.price - b.price;
            break;
          case "hightolow":
            comparisonResult = b.price - a.price;
            break;
          default:
            break;
        }

        if (comparisonResult !== 0) return;
      });

      return comparisonResult;
    });

  const contextValue: ISearchContext = {
    searchTerm,
    setSearchTerm,
    filteredAndSortedProducts,

    filters,
    filterItems,

    sorting,
    sortItems,

    handleFilterChange,
    handleSortChange,
    resetFilters,
    resetSorting,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};
