"use client";

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
