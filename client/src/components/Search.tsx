import {
  FilterIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon,
  icons,
} from "lucide-react";
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
    filteredAndSortedProducts,
    filters,
    filterItems,
    sortItems,
    sorting,
    handleFilterChange,
    handleSortChange,
    resetFilters,
    resetSorting,
  } = useContext(SearchContext);

  return (
    <>
      <div className="flex mt-2 w-[86%] mx-auto space-x-4 sm:w-3/4 md:w-3/5 lg:1/3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 shadow-md md:h-10"
              title="Filters"
            >
              <FilterIcon className="w-4 h-4" />
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
                className="flex items-center justify-center py-1 space-x-1 text-white rounded-sm cursor-pointer bg-stone-600 focus:bg-stone-600"
              >
                <span className="pb-0.5 tracking-wider">Reset</span>
                <ResetIcon className="w-4 h-4" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 shadow-md md:h-10"
              title="Sort"
            >
              <SlidersHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-44">
            {sortItems.map(({ label, stateKey, iconName }) => {
              const LucideIcon = icons[iconName];
              return (
                <DropdownMenuCheckboxItem
                  key={stateKey}
                  checked={sorting[stateKey]}
                  onCheckedChange={handleSortChange(stateKey)}
                  onSelect={(event) => event.preventDefault()}
                  className="flex items-center justify-between"
                >
                  {label}
                  <LucideIcon className="w-5 h-5" />
                </DropdownMenuCheckboxItem>
              );
            })}

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={resetSorting}
                className="flex items-center justify-center py-1 space-x-1 text-white rounded-sm cursor-pointer bg-stone-600 focus:bg-stone-600"
              >
                <span className="pb-0.5 tracking-wider">Reset</span>
                <ResetIcon className="w-4 h-4" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative w-full">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search a product..."
            className="shadow-md pl-9 md:h-10"
          />
          <span className="absolute top-2.5 md:top-3 left-3">
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
      {filteredAndSortedProducts.length === 0 && searchTerm !== "" && (
        <div className="py-10 pb-56 font-medium text-center">
          <p>No products found</p>
        </div>
      )}
    </>
  );
};

export default Search;
