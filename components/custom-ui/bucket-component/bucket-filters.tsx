import FilterButtons from "./filter";
import SearchBar from "./search-bar";
import SelectRegions from "./select-regions";
import type { BucketFiltersProps } from "@/types/bucket-filters";

export default function BucketFilters({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
}: BucketFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex-1 w-full">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <FilterButtons
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <SelectRegions />
      </div>
    </div>
  );
}
