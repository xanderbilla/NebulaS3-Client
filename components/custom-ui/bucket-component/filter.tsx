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
        className={`inline-flex items-center px-3 py-1.5 border rounded-md transition-all duration-200 ${
          activeFilter === "size"
            ? "glass-card border-blue-200/50 dark:border-blue-700/30 text-blue-700 dark:text-blue-300"
            : "glass-hover border-white/20 dark:border-white/10 glass-text"
        }`}
      >
        <ArrowUpAzIcon
          className={`h-4 w-4 mr-2 transition-colors ${
            activeFilter === "size"
              ? "text-blue-500 dark:text-blue-400"
              : "text-zinc-400 dark:text-zinc-500"
          }`}
        />
        <span>Size</span>
      </button>
      <button
        type="button"
        onClick={() => setActiveFilter(activeFilter === "date" ? null : "date")}
        className={`inline-flex items-center px-3 py-1.5 border rounded-md transition-all duration-200 ${
          activeFilter === "date"
            ? "glass-card border-purple-200/50 dark:border-purple-700/30 text-purple-700 dark:text-purple-300"
            : "glass-hover border-white/20 dark:border-white/10 glass-text"
        }`}
      >
        <Calendar
          className={`h-4 w-4 mr-2 transition-colors ${
            activeFilter === "date"
              ? "text-purple-500 dark:text-purple-400"
              : "text-zinc-400 dark:text-zinc-500"
          }`}
        />
        <span>Date</span>
      </button>
    </div>
  );
};

export default FilterButtons;
