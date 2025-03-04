"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { CreateBucket } from "@/components/bucket-component/create-bkt";
import useBuckets from "@/hooks/useBuckets";

// Dynamically imported components with loading placeholders
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
    loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-10" />,
  }
);
const BucketCard = dynamic(
  () => import("@/components/bucket-component/bucket-card"),
  {
    loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-40" />,
  }
);
const SelectRegions = dynamic(
  () => import("@/components/bucket-component/regions"),
  {
    loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-10" />,
  }
);

export default function Page() {
  const { buckets, isLoading, isError, refetch } = useBuckets();
  const [activeFilter, setActiveFilter] = useState<"size" | "date" | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Compute the displayed buckets based on the search term and active filter
  const displayedBuckets = useMemo(() => {
    let data = [...buckets];

    if (searchTerm) {
      data = data.filter((bucket) =>
        bucket.bucketName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeFilter === "size") {
      data = data.sort((a, b) => {
        const sizeToBytes = (size: string) => {
          const [value, unit] = size.split(" ");
          const numValue = parseFloat(value);
          switch (unit?.toUpperCase()) {
            case "KB":
              return numValue * 1024;
            case "MB":
              return numValue * 1024 * 1024;
            case "GB":
              return numValue * 1024 * 1024 * 1024;
            case "TB":
              return numValue * 1024 * 1024 * 1024 * 1024;
            default:
              return numValue;
          }
        };
        return sizeToBytes(b.size || "0") - sizeToBytes(a.size || "0");
      });
    } else if (activeFilter === "date") {
      data = data.sort(
        (a, b) =>
          new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );
    }
    return data;
  }, [buckets, searchTerm, activeFilter]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SelectRegions />
        <CreateBucket onBucketCreated={refetch} />
        <FilterButtons
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 rounded h-40" />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500">{isError}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {displayedBuckets.map((bucket) => (
            <BucketCard key={bucket.bucketName} bucket={bucket} onBucketDelete={refetch}/>
          ))}
        </div>
      )}
    </div>
  );
}
