// components/bucket-component/filter.tsx
import React from "react";
import { ArrowUpAzIcon, Calendar } from "lucide-react";

interface Props {
  activeFilter: "size" | "date" | null;
  setActiveFilter: (filter: "size" | "date" | null) => void;
}

const FilterButtons = ({ activeFilter, setActiveFilter }: Props) => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => setActiveFilter(activeFilter === "size" ? null : "size")}
        className={`inline-flex items-center px-3 py-1.5 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 ${
          activeFilter === "size"
            ? "bg-gray-100 dark:bg-gray-800"
            : "dark:bg-gray-950"
        }`}
      >
        <ArrowUpAzIcon className="h-4 w-4 mr-2 dark:text-gray-400" />
        <span className="dark:text-gray-300">Size</span>
      </button>
      <button
        type="button"
        onClick={() => setActiveFilter(activeFilter === "date" ? null : "date")}
        className={`inline-flex items-center px-3 py-1.5 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 ${
          activeFilter === "date"
            ? "bg-gray-100 dark:bg-gray-800"
            : "dark:bg-gray-950"
        }`}
      >
        <Calendar className="h-4 w-4 mr-2 dark:text-gray-400" />
        <span className="dark:text-gray-300">Date</span>
      </button>
    </div>
  );
};

export default FilterButtons;
