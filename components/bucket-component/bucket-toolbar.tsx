import dynamic from "next/dynamic";
import { CreateBucket } from "@/components/bucket-component/create-bkt";

const SearchBar = dynamic(
  () => import("@/components/bucket-component/search"),
  {
    loading: () => (
      <div className="h-10 w-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
    ),
  }
);

const FilterButtons = dynamic(
  () => import("@/components/bucket-component/filter"),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-10" />
    ),
  }
);

const SelectRegions = dynamic(
  () => import("@/components/bucket-component/regions"),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-10" />
    ),
  }
);

interface BucketToolbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: "size" | "date" | null;
  setActiveFilter: (filter: "size" | "date" | null) => void;
  onBucketCreated: () => void;
}

export default function BucketToolbar({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  onBucketCreated,
}: BucketToolbarProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-auto">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex flex-row gap-2 sm:gap-4 w-full sm:w-auto justify-end">
        <SelectRegions />
        <CreateBucket onBucketCreated={onBucketCreated} />
        <FilterButtons
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
    </div>
  );
}
