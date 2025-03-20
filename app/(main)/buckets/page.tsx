"use client";

import { useState, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import BucketHeaderSkeleton from "@/components/custom-ui/skeleton/bucket-header-skeleton";
import BucketFiltersSkeleton from "@/components/custom-ui/skeleton/bucket-filters-skeleton";
import BucketGridSkeleton from "@/components/custom-ui/skeleton/bucket-grid-skeleton";

// Dynamic imports with skeleton loading states
const BucketHeader = dynamic(
  () => import("@/components/custom-ui/bucket-component/bucket-header"),
  {
    loading: () => <BucketHeaderSkeleton />,
    ssr: false,
  }
);

const BucketFilters = dynamic(
  () => import("@/components/custom-ui/bucket-component/bucket-filters"),
  {
    loading: () => <BucketFiltersSkeleton />,
    ssr: false,
  }
);

const BucketGrid = dynamic(
  () => import("@/components/custom-ui/bucket-component/bucket-grid"),
  {
    loading: () => <BucketGridSkeleton />,
    ssr: false,
  }
);

// Static mock data
import { mockBuckets } from "@/static/buckets";

export default function BucketsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"size" | "date" | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredBuckets = mockBuckets
    .filter((bucket) =>
      bucket.bucketName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (activeFilter === "size") {
        const sizeA = parseFloat(a.size);
        const sizeB = parseFloat(b.size);
        return sizeB - sizeA;
      } else if (activeFilter === "date") {
        return b.createdOn.getTime() - a.createdOn.getTime();
      }
      return 0;
    });

  const handleBucketDelete = (bucketId: string) => {
    // Implement delete functionality
    console.log("Delete bucket:", bucketId);
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <BucketHeaderSkeleton />
          <BucketFiltersSkeleton />
          <BucketGridSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <Suspense fallback={<BucketHeaderSkeleton />}>
          <BucketHeader />
        </Suspense>

        <Suspense fallback={<BucketFiltersSkeleton />}>
          <BucketFilters
            searchTerm={searchQuery}
            setSearchTerm={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </Suspense>

        <Suspense fallback={<BucketGridSkeleton />}>
          <BucketGrid buckets={filteredBuckets} onDelete={handleBucketDelete} />
        </Suspense>
      </div>
    </div>
  );
}
