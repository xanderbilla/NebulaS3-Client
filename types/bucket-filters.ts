export interface BucketFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeFilter: "size" | "date" | null;
  setActiveFilter: (filter: "size" | "date" | null) => void;
}
