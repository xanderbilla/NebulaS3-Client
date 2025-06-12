"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useBuckets } from "@/hooks/useBuckets";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";

// Mock data for demonstration
const mockBuckets = [
  {
    id: "1",
    bucketName: "production-assets",
    region: "us-east-1",
    size: "2.4 GB",
    numberOfObjects: 1847,
  },
  {
    id: "2",
    bucketName: "user-uploads",
    region: "us-west-2",
    size: "856 MB",
    numberOfObjects: 392,
  },
  {
    id: "3",
    bucketName: "backup-data",
    region: "eu-west-1",
    size: "5.2 GB",
    numberOfObjects: 234,
  },
  {
    id: "4",
    bucketName: "cdn-cache",
    region: "ap-south-1",
    size: "1.1 GB",
    numberOfObjects: 1567,
  },
  {
    id: "5",
    bucketName: "logs-archive",
    region: "us-east-1",
    size: "3.7 GB",
    numberOfObjects: 89,
  },
  {
    id: "6",
    bucketName: "dev-environment",
    region: "us-west-1",
    size: "234 MB",
    numberOfObjects: 156,
  },
  {
    id: "7",
    bucketName: "analytics-data",
    region: "eu-central-1",
    size: "987 MB",
    numberOfObjects: 78,
  },
  {
    id: "8",
    bucketName: "temp-storage",
    region: "ap-southeast-1",
    size: "45 MB",
    numberOfObjects: 23,
  },
];

const mockActivity = [
  {
    id: "1",
    action: "Uploaded 23 files",
    name: "production-assets",
    timestamp: "2025-06-12T08:30:00Z",
    type: "upload",
  },
  {
    id: "2",
    action: "Deleted old backups",
    name: "backup-data",
    timestamp: "2025-06-12T07:15:00Z",
    type: "delete",
  },
  {
    id: "3",
    action: "Accessed bucket",
    name: "user-uploads",
    timestamp: "2025-06-12T06:45:00Z",
    type: "access",
  },
  {
    id: "4",
    action: "Created new folder",
    name: "cdn-cache",
    timestamp: "2025-06-11T22:30:00Z",
    type: "create",
  },
  {
    id: "5",
    action: "Downloaded archive",
    name: "logs-archive",
    timestamp: "2025-06-11T20:15:00Z",
    type: "download",
  },
  {
    id: "6",
    action: "Updated permissions",
    name: "dev-environment",
    timestamp: "2025-06-11T18:00:00Z",
    type: "update",
  },
  {
    id: "7",
    action: "Synced analytics",
    name: "analytics-data",
    timestamp: "2025-06-11T15:30:00Z",
    type: "sync",
  },
  {
    id: "8",
    action: "Cleared temp files",
    name: "temp-storage",
    timestamp: "2025-06-11T12:00:00Z",
    type: "cleanup",
  },
];

export default function DashboardOverview() {
  const { data: bucketsResponse, isLoading: bucketsLoading } = useBuckets({
    page: 0,
    size: 10,
  });

  const storageScrollRef = useScrollIndicator();
  const activityScrollRef = useScrollIndicator();

  const buckets = React.useMemo(
    () => bucketsResponse?.data?.content ?? [],
    [bucketsResponse?.data?.content]
  );
  const hasRealData = buckets.length > 0;

  // Use real data if available, otherwise show mock data
  const displayBuckets = hasRealData ? buckets : mockBuckets;

  // Generate recent activity from bucket data or use mock data
  const recentActivity = React.useMemo(() => {
    if (hasRealData) {
      return buckets
        .filter((bucket) => bucket.lastUsed)
        .sort(
          (a, b) =>
            new Date(b.lastUsed!).getTime() - new Date(a.lastUsed!).getTime()
        )
        .slice(0, 8)
        .map((bucket) => ({
          id: bucket.id,
          type: "bucket_access" as const,
          action: `Accessed bucket`,
          name: bucket.bucketName,
          timestamp: bucket.lastUsed!,
        }));
    }
    return mockActivity;
  }, [buckets, hasRealData]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 glass-card glass-card-hover">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg glass-card-title">
            Storage Overview
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm glass-card-description">
            Storage usage across all buckets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            ref={storageScrollRef}
            className="h-[200px] overflow-y-auto custom-scrollbar space-y-4 glass-card-content pr-2"
          >
            {bucketsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={`bucket-skeleton-${i + 1}`}
                    className="flex justify-between items-center p-3 rounded-lg bg-accent/20 animate-pulse min-h-[68px]"
                  >
                    <div className="flex-1">
                      <div className="h-[20px] w-32 bg-accent rounded"></div>
                      <div className="h-[16px] w-20 bg-accent rounded mt-1"></div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="h-[20px] w-16 bg-accent rounded"></div>
                      <div className="h-[16px] w-20 bg-accent rounded mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {displayBuckets.map((bucket) => (
                  <div
                    key={bucket.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors min-h-[68px] gap-4"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm h-[20px] flex items-center">
                        {bucket.bucketName}
                      </div>
                      <div className="text-xs text-muted-foreground h-[16px] flex items-center mt-1">
                        {bucket.region}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-sm h-[20px] flex items-center justify-end">
                        {bucket.size}
                      </div>
                      <div className="text-xs text-muted-foreground h-[16px] flex items-center justify-end mt-1">
                        {bucket.numberOfObjects} objects
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3 glass-card glass-card-hover">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg glass-card-title">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={activityScrollRef}
            className="h-[200px] overflow-y-auto custom-scrollbar space-y-3 glass-card-content pr-2"
          >
            {bucketsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={`activity-skeleton-${index}`}
                    className="flex flex-col space-y-1 p-3 rounded-lg bg-accent/10 animate-pulse"
                  >
                    <div className="flex justify-between items-start">
                      <div className="h-4 w-32 bg-accent rounded"></div>
                      <div className="h-3 w-16 bg-accent rounded"></div>
                    </div>
                    <div className="h-3 w-24 bg-accent rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={`activity-${activity.id}`}
                    className="flex flex-col space-y-1 p-3 rounded-lg bg-accent/10 hover:bg-accent/15 transition-colors border border-transparent hover:border-accent/20"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">
                        {activity.action}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Bucket: {activity.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
