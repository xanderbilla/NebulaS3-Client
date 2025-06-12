export interface BucketFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: "size" | "date" | null;
  setActiveFilter: (filter: "size" | "date" | null) => void;
  regions?: string[];
  selectedRegion?: string | null;
  onRegionChange?: (region: string | null) => void;
  sortOrder?: "asc" | "desc";
}
