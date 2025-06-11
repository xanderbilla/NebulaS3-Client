"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import SuccessStatus from "./custom-ui/status/SuccessStatus";
import ErrorStatus from "./custom-ui/status/ErrorStatus";

interface HealthCheckProps {
  readonly className?: string;
  readonly compact?: boolean;
}

export default function HealthCheck({
  className,
  compact = false,
}: HealthCheckProps) {
  const { data: health, isLoading, error } = useHealthCheck();

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          compact ? "px-2 py-1" : "p-4",
          "rounded-lg text-sm",
          className
        )}
      >
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <span className="text-sm">Checking status...</span>
        </div>
      </div>
    );
  }

  if (error || !health) {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          compact ? "px-2 py-1" : "p-4",
          "rounded-lg text-sm",
          className
        )}
      >
        <ErrorStatus />
      </div>
    );
  }

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
