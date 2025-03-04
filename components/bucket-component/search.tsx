import { Search } from "lucide-react";
import React from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="relative w-full max-w-md">
      <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 
      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-600 dark:placeholder-gray-400"
      placeholder="Search buckets..."
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search size={20} className="h-5 w-5 text-gray-400 dark:text-gray-500"/>
      </div>
    </div>
  );
};

export default SearchBar;
