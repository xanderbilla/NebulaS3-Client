"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useBucketStats } from "@/hooks/useBuckets";

export default function DashboardStatsCards() {
  const { data: stats, isLoading, error } = useBucketStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={`stats-skeleton-${Date.now()}-${i}`} className="glass-card">
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

  if (error || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">
              Unable to load statistics
            </div>
          </CardContent>
        </Card>
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
          <div className="text-xl sm:text-2xl gradient-text">
            {stats.totalBuckets}
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            +20% from last month
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
          <div className="text-xl sm:text-2xl gradient-text">
            {stats.totalObjects}
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            +15% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card glass-card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm glass-card-title">
            Storage Used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl gradient-text">
            {stats.totalStorageGB.toFixed(2)} GB
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            +10% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card glass-card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm glass-card-title">
            Active Regions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl gradient-text">
            {stats.uniqueRegions}
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            Across multiple zones
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
