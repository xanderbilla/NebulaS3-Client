import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function DashboardStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card glass-card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm glass-card-title">
            Total Buckets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl gradient-text">0</div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            +0% from last month
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
          <div className="text-xl sm:text-2xl gradient-text">0</div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            +0% from last month
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
          <div className="text-xl sm:text-2xl gradient-text">0 MB</div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            +0% from last month
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
          <div className="text-xl sm:text-2xl gradient-text">1</div>
          <p className="text-[10px] sm:text-xs glass-card-description">
            ap-south-1
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
