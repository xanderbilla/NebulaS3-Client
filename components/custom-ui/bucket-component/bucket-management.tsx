"use client";

import { useState, useMemo, useCallback } from "react";
import { useBuckets, useCreateBucket } from "@/hooks/useBuckets";
import BucketHeader from "@/components/custom-ui/bucket-component/bucket-header";
import BucketFilters from "@/components/custom-ui/bucket-component/bucket-filters";
import BucketGrid from "@/components/custom-ui/bucket-component/BucketGrid";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function BucketManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"size" | "date" | null>(
    null
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // 1-based pagination for UI and API
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Determine sort parameter based on active filter
  let sortBy: "size" | "createdAt" | undefined;
  if (activeFilter === "size") {
    sortBy = "size";
  } else if (activeFilter === "date") {
    sortBy = "createdAt";
  }

  // Build query params conditionally
  const queryParams = {
    ...(searchQuery.trim() && { search: searchQuery.trim() }),
    ...(sortBy && { sortBy, sortOrder }),
    page: currentPage, // Use 1-based pagination
  };

  const { data: bucketsResponse, isLoading } = useBuckets(queryParams);

  const buckets = useMemo(
    () => bucketsResponse?.data?.content ?? [],
    [bucketsResponse?.data?.content]
  );

  // Get pagination info from response
  const paginationData = bucketsResponse?.data;
  const totalPages = paginationData?.totalPages ?? 1;
  const hasNext = paginationData?.hasNext ?? false;
  const hasPrevious = paginationData?.hasPrevious ?? false;

  const { mutate: createBucket } = useCreateBucket();

  // Since region filtering is not supported by API, apply client-side region filter
  const displayBuckets = useMemo(() => {
    return selectedRegion
      ? buckets.filter(
          (bucket) =>
            bucket.region.toLowerCase() === selectedRegion.toLowerCase()
        )
      : buckets;
  }, [buckets, selectedRegion]);

  // Get unique regions from bucket data - memoized
  const availableRegions = useMemo(() => {
    return Array.from(
      new Set(
        buckets
          .map((bucket) => bucket.region)
          .filter((region): region is string => Boolean(region))
      )
    ).map((region) => region.toUpperCase());
  }, [buckets]);

  const handleBucketDelete = useCallback(() => {
    // The actual deletion is handled by the BucketGrid component
  }, []);

  const handleBucketEmpty = useCallback(() => {
    // The actual emptying is handled by the BucketGrid component
  }, []);

  const handleBucketCreate = useCallback(
    (bucketName: string) => {
      createBucket(bucketName);
    },
    [createBucket]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset page when filters change
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Reset page when search or filters change
  const handleSearchChange = (term: string) => {
    setSearchQuery(term);
    resetPage();
  };

  const handleFilterChange = (filter: "size" | "date" | null) => {
    if (filter === "date" && activeFilter === "date") {
      // Toggle sort order if clicking the same date filter
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else if (filter === "date") {
      // First time clicking date filter - start with asc
      setActiveFilter(filter);
      setSortOrder("asc");
    } else {
      // For size filter or clearing filters
      setActiveFilter(filter);
      setSortOrder("desc");
    }
    resetPage();
  };

  const handleRegionChange = (region: string | null) => {
    setSelectedRegion(region);
    resetPage();
  };

  // Generate pagination items with proper logic
  const renderPaginationItems = () => {
    const items = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Add previous button
    if (hasPrevious) {
      items.push(
        <PaginationItem key="prev">
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className="glass-card glass-card-hover cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
          />
        </PaginationItem>
      );
    }

    // Add ellipsis at start if needed
    if (startPage > 1) {
      items.push(
        <PaginationItem key="start">
          <PaginationLink
            onClick={() => handlePageChange(1)}
            className="glass-card glass-card-hover cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis className="glass-text" />
          </PaginationItem>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
            className={`glass-card glass-card-hover cursor-pointer border-white/10 transition-all duration-200 ${
              i === currentPage
                ? "bg-primary/20 text-primary border-primary/30 shadow-lg shadow-primary/20"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis at end if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis className="glass-text" />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key="end">
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            className="glass-card glass-card-hover cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add next button
    if (hasNext) {
      items.push(
        <PaginationItem key="next">
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className="glass-card glass-card-hover cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
          />
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <BucketHeader onCreateBucket={handleBucketCreate} />

        <BucketFilters
          searchTerm={searchQuery}
          setSearchTerm={handleSearchChange}
          activeFilter={activeFilter}
          setActiveFilter={handleFilterChange}
          regions={availableRegions}
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
          sortOrder={sortOrder}
        />

        <BucketGrid
          buckets={displayBuckets}
          onDelete={handleBucketDelete}
          onEmpty={handleBucketEmpty}
          isLoading={isLoading}
        />

        {/* Pagination - Only show if there's more than 1 page */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination className="glass-card p-3 rounded-xl border border-white/20 backdrop-blur-lg bg-white/5 dark:bg-black/5 shadow-lg">
              <PaginationContent className="gap-2">
                {renderPaginationItems()}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
