import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function DashboardOverview() {
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
          <div className="h-[300px] flex items-center justify-center glass-card-content">
            No data available
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
          <div className="h-[300px] flex items-center justify-center glass-card-content">
            No recent activity
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
