import React from "react";

interface BucketSkeletonProps {
  count?: number;
}

export default function BucketSkeleton({ count = 6 }: BucketSkeletonProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Filters skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="h-10 w-full sm:w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
