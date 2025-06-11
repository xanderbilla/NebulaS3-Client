import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { mockBuckets } from "@/static/buckets";

export default function DashboardOverview() {
  // Create some mock activity data
  const recentActivity = [
    {
      action: "Created bucket",
      bucket: "mobile-app-assets",
      time: "2 hours ago",
    },
    {
      action: "Uploaded 15 files",
      bucket: "user-uploads",
      time: "5 hours ago",
    },
    {
      action: "Updated permissions",
      bucket: "website-assets",
      time: "1 day ago",
    },
    {
      action: "Deleted 3 objects",
      bucket: "my-backup-bucket",
      time: "2 days ago",
    },
    {
      action: "Enabled versioning",
      bucket: "data-analytics",
      time: "3 days ago",
    },
  ];

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
          <div className="h-[300px] space-y-4 glass-card-content">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockBuckets.slice(0, 6).map((bucket) => (
                <div
                  key={bucket.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-accent/20"
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
          <div className="h-[300px] space-y-3 glass-card-content">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col space-y-1 p-3 rounded-lg bg-accent/10"
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium">{activity.action}</span>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Bucket: {activity.bucket}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
