"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useRecentActivity, useBuckets } from "@/hooks/useBuckets";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";

export default function DashboardOverview() {
  const { data: recentActivityData, isLoading: activityLoading } =
    useRecentActivity();
  const { data: bucketsResponse, isLoading: bucketsLoading } = useBuckets({
    page: 1,
    limit: 6,
  });

  const storageScrollRef = useScrollIndicator();
  const activityScrollRef = useScrollIndicator();

  const buckets = bucketsResponse?.data?.content || [];
  const recentActivity = recentActivityData || [];

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
            className="h-[300px] overflow-y-auto custom-scrollbar space-y-4 glass-card-content pr-2"
          >
            {bucketsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={`bucket-skeleton-${i + 1}`}
                    className="flex justify-between items-center p-3 rounded-lg bg-accent/20 animate-pulse"
                  >
                    <div>
                      <div className="h-4 w-32 bg-accent rounded mb-2"></div>
                      <div className="h-3 w-20 bg-accent rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 w-16 bg-accent rounded mb-2"></div>
                      <div className="h-3 w-20 bg-accent rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {buckets.map((bucket) => (
                  <div
                    key={bucket.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-sm">
                        {bucket.bucketName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {bucket.region}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{bucket.size}</div>
                      <div className="text-xs text-muted-foreground">
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
            className="h-[300px] overflow-y-auto custom-scrollbar space-y-3 glass-card-content pr-2"
          >
            {activityLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={`activity-skeleton-${index + 1}`}
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
