"use client";
import { cn } from "@/lib/utils";
import React from "react";
import SuccessStatus from "./custom-ui/status/SuccessStatus";

interface HealthCheckProps {
  readonly className?: string;
  readonly compact?: boolean;
}

export default function HealthCheck({
  className,
  compact = false,
}: HealthCheckProps) {
  // Hardcoded to always show success status
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        compact ? "px-2 py-1" : "p-4",
        "rounded-lg text-sm",
        className
      )}
    >
      <SuccessStatus />
    </div>
  );
}
