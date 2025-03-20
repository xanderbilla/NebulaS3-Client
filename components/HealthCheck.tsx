"use client";
import { useHealthCheck } from "@/lib/hooks/useHealthCheck";

// Simplified component with inline status indicators
export default function HealthCheck({ 
  compact = false, 
  className = "" 
}: { 
  compact?: boolean;
  className?: string;
}) {
  const { status } = useHealthCheck();

  // Simplified inline status indicators
  const StatusIndicator = () => {
    // Loading state
    if (status === "loading") {
      return (
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-yellow-400 animate-pulse"></div>
          <span className="text-xs">Checking connection...</span>
        </div>
      );
    }
    
    // Success state
    if (status === "SUCCESS") {
      return (
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-500"></div>
          <span className="text-xs">Server online</span>
        </div>
      );
    }
    
    // Error state
    return (
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-red-500"></div>
        <span className="text-xs">Connection error</span>
      </div>
    );
  };

  return (
    <div className={`flex items-center gap-2 ${compact ? "px-2 py-1" : "p-4"} rounded-lg text-sm ${className}`}>
      <StatusIndicator />
    </div>
  );
}
