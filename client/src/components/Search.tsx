import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useContext } from "react";
import { SearchContext } from "@/context/search-context";
import { Button } from "./ui/button";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ResetIcon } from "@radix-ui/react-icons";

const Search = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    filters,
    filterItems,
    handleFilterChange,
    resetFilters,
  } = useContext(SearchContext);

  return (
    <>
      <div className="flex mt-2 w-[86%] mx-auto space-x-4 sm:w-3/4 md:w-3/5 lg:1/3 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 shadow-md"
            >
              <FilterIcon className="w-4 h-4" />
              <span className="hidden sm:inline-block">Filters</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            {filterItems.map(({ label, stateKey }) => (
              <DropdownMenuCheckboxItem
                key={stateKey}
                checked={filters[stateKey]}
                onCheckedChange={handleFilterChange(stateKey)}
                onSelect={(event) => event.preventDefault()}
              >
                {label}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={resetFilters}
                className="flex items-center justify-center space-x-2 rounded-sm cursor-pointer bg-stone-600 focus:bg-stone-600"
              >
                <span className="text-white">Reset</span>
                <ResetIcon className="w-4 h-4 text-white" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative w-full">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search a product..."
            className="pl-8 shadow-md md:h-10"
          />
          <span className="absolute top-2.5 md:top-3 left-2">
            <SearchIcon className="w-4 h-4" />
          </span>

          {searchTerm !== "" && (
            <span
              className="absolute cursor-pointer top-2 md:top-2.5 right-2"
              onClick={() => setSearchTerm("")}
            >
              <XIcon className="w-5 h-5" />
            </span>
          )}
        </div>
      </div>
      {filteredProducts.length === 0 && (
        <div className="py-10 pb-56 font-medium text-center">
          <p>No products found</p>
        </div>
      )}
    </>
  );
};

export default Search;
