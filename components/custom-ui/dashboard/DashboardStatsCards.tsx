import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { mockBuckets } from "@/static/buckets";

export default function DashboardStatsCards() {
  // Calculate stats from mock data
  const totalBuckets = mockBuckets.length;
  const totalObjects = mockBuckets.reduce(
    (sum, bucket) => sum + (bucket.numberOfObjects ?? 0),
    0
  );
  const totalStorageGB = mockBuckets.reduce((sum, bucket) => {
    const sizeStr = bucket.size ?? "0 GB";
    const regex = /([0-9.]+)\s*(GB|MB)/;
    const sizeMatch = regex.exec(sizeStr);
    if (sizeMatch) {
      const value = parseFloat(sizeMatch[1]);
      const unit = sizeMatch[2];
      return sum + (unit === "GB" ? value : value / 1024);
    }
    return sum;
  }, 0);
  const activeRegions = Array.from(
    new Set(mockBuckets.map((bucket) => bucket.region).filter(Boolean))
  ).length;

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
            {totalBuckets}
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
            {totalObjects !== 0 ? totalObjects : 1245}
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
            {totalStorageGB.toFixed(1)} GB
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            +8% from last month
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
            {activeRegions}
          </div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            us-east-1, eu-west-1, ap-south-1
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
