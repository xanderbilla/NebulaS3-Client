import React from "react";
import DashboardStatsCards from "./DashboardStatsCards";
import DashboardOverview from "./DashboardOverview";

export default function DashboardContent() {
  return (
    <div className="space-y-4">
      <DashboardStatsCards />
      <DashboardOverview />
    </div>
  );
}
export function DashboardContent() { return <div>Dashboard Content</div> }
