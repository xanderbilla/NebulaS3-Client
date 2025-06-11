"use client";

import { useState } from "react";
import { useBuckets } from "@/hooks/useBuckets";
import BucketHeader from "@/components/custom-ui/bucket-component/bucket-header";
import BucketFilters from "@/components/custom-ui/bucket-component/bucket-filters";
import BucketGrid from "@/components/custom-ui/bucket-component/BucketGrid";

export default function BucketManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"size" | "date" | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const { data: bucketsResponse, isLoading } = useBuckets({
    search: searchQuery,
    sortBy: activeFilter === "size" ? "size" : "createdAt",
    sortOrder: "desc",
    page: 0,
    size: 50,
  });

  const buckets = bucketsResponse?.data?.content || [];

  // Get unique regions from bucket data
  const availableRegions = Array.from(
    new Set(
      buckets
        .map((bucket) => bucket.region)
        .filter((region): region is string => Boolean(region))
    )
  ).map((region) => region.toUpperCase());

  const handleBucketDelete = (bucketId: string) => {
    console.log("Delete bucket:", bucketId);
  };

  const handleBucketCreate = (bucketName: string, region: string) => {
    console.log("Create bucket:", bucketName, "in region:", region);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <BucketHeader onCreateBucket={handleBucketCreate} />

        <BucketFilters
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          regions={availableRegions}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />

        <BucketGrid
          buckets={buckets}
          onDelete={handleBucketDelete}
          externalSearchTerm={searchQuery}
          externalActiveFilter={activeFilter}
          externalSelectedRegion={selectedRegion}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
