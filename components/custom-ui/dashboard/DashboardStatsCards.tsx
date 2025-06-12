"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useBuckets } from "@/hooks/useBuckets";

// Mock data for demonstration when no real data is available
const mockStats = {
  totalBuckets: 8,
  totalObjects: 4386,
  totalFolders: 156,
  activeBuckets: 6,
  uniqueRegions: 5,
};

export default function DashboardStatsCards() {
  const { data: bucketsResponse, isLoading } = useBuckets({
    page: 0,
    size: 1000,
  });

  // Calculate stats from bucket data
  const stats = React.useMemo(() => {
    const buckets = bucketsResponse?.data?.content || [];

    // If no real data, use mock data for demonstration
    if (!buckets.length) {
      return mockStats;
    }

    const totalObjects = buckets.reduce(
      (sum, bucket) => sum + bucket.numberOfObjects,
      0
    );
    const totalFolders = buckets.reduce(
      (sum, bucket) => sum + bucket.numberOfFolders,
      0
    );

    // Calculate active buckets and unique regions
    const activeBuckets = buckets.filter(
      (bucket) => bucket.numberOfObjects > 0
    ).length;
    const uniqueRegions = new Set(buckets.map((bucket) => bucket.region)).size;

    return {
      totalBuckets: buckets.length,
      totalObjects,
      totalFolders,
      activeBuckets,
      uniqueRegions,
    };
  }, [bucketsResponse?.data?.content]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={`stats-skeleton-${i + 1}`} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted animate-pulse rounded w-24" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded w-16 mb-2" />
              <div className="h-3 bg-muted animate-pulse rounded w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card glass-card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm glass-card-title">
            Total Buckets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
            {stats.totalBuckets}
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            Active buckets: {stats.activeBuckets}
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card glass-card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm glass-card-title">
            Total Objects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
            {stats.totalObjects.toLocaleString()}
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            Across all buckets
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card glass-card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm glass-card-title">
            Total Folders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
            {stats.totalFolders.toLocaleString()}
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            Organized structure
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card glass-card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm glass-card-title">
            Regions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl lg:text-4xl gradient-text">
            {stats.uniqueRegions}
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            Geographic distribution
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
