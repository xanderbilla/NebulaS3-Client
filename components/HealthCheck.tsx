"use client";
import { cn } from "@/lib/utils";
import React from "react";
import LoadingStatus from "./custom-ui/status/LoadingStatus";
import SuccessStatus from "./custom-ui/status/SuccessStatus";
import ErrorStatus from "./custom-ui/status/ErrorStatus";
import { useHealthCheck } from "@/lib/hooks/useHealthCheck";

interface HealthCheckProps {
  readonly className?: string;
  readonly compact?: boolean;
}

const getStatusMessage = (status: string) => {
  if (status === "loading") return <LoadingStatus />;
  if (status === "SUCCESS") return <SuccessStatus />;
  return <ErrorStatus />;
};

export default function HealthCheck({
  compact = false,
}: HealthCheckProps) {
  const { status } = useHealthCheck();

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        compact ? "px-2 py-1" : "p-4",
        "rounded-lg text-sm",
      )}
    >
      {getStatusMessage(status)}
    </div>
  );
}
