"use client";

import { useState } from "react";
import useBuckets from "@/hooks/useBuckets";
import { useBucketFiltering } from "@/hooks/useBucketFiltering";
import BucketToolbar from "@/components/bucket-component/bucket-toolbar";
import BucketGrid from "@/components/bucket-component/bucket-grid";
import BucketGridSkeleton from "@/components/bucket-component/bucket-grid-skeleton";

export default function Page() {
  const { buckets, isLoading, isError, refetch } = useBuckets();
  const [activeFilter, setActiveFilter] = useState<"size" | "date" | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBuckets = useBucketFiltering({
    buckets,
    searchTerm,
    activeFilter,
  });

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-red-500 dark:text-red-400 text-center">
          Error: {isError}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BucketToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onBucketCreated={refetch}
      />

      {isLoading ? (
        <BucketGridSkeleton count={8} />
      ) : (
        <BucketGrid buckets={filteredBuckets} onBucketDelete={refetch} />
      )}
    </div>
  );
}
