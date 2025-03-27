import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-wrap gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="w-[160px] h-[160px]">
          <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
            <div className="w-full h-24 bg-gray-300 dark:bg-gray-600 rounded-t-lg" />
            <div className="p-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
