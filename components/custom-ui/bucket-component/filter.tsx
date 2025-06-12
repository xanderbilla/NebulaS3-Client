import React from "react";
import { ArrowUpAzIcon, Calendar, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  activeFilter: "size" | "date" | null;
  setActiveFilter: (filter: "size" | "date" | null) => void;
  sortOrder?: "asc" | "desc";
}

const FilterButtons = ({
  activeFilter,
  setActiveFilter,
  sortOrder = "desc",
}: Props) => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => setActiveFilter(activeFilter === "size" ? null : "size")}
        className={`inline-flex items-center px-3 py-1.5 border rounded-md transition-all duration-200 ${
          activeFilter === "size"
            ? "glass-card border-blue-200/60 dark:border-blue-600/40 text-blue-700 dark:text-blue-300 bg-blue-50/30 dark:bg-blue-950/20"
            : "glass-hover border-gray-200/40 dark:border-white/10 glass-text"
        }`}
      >
        <ArrowUpAzIcon
          className={`h-4 w-4 mr-2 transition-colors ${
            activeFilter === "size"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        />
        <span>Size</span>
      </button>
      <button
        type="button"
        onClick={() => setActiveFilter(activeFilter === "date" ? null : "date")}
        className={`inline-flex items-center px-3 py-1.5 border rounded-md transition-all duration-200 ${
          activeFilter === "date"
            ? "glass-card border-blue-200/60 dark:border-blue-600/40 text-blue-700 dark:text-blue-300 bg-blue-50/30 dark:bg-blue-950/20"
            : "glass-hover border-gray-200/40 dark:border-white/10 glass-text"
        }`}
      >
        <Calendar
          className={`h-4 w-4 mr-2 transition-colors ${
            activeFilter === "date"
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        />
        <span>Date</span>
        {activeFilter === "date" &&
          (sortOrder === "asc" ? (
            <ArrowUp className="h-3 w-3 ml-1 text-blue-600 dark:text-blue-400" />
          ) : (
            <ArrowDown className="h-3 w-3 ml-1 text-blue-600 dark:text-blue-400" />
          ))}
      </button>
    </div>
  );
};

export default FilterButtons;
