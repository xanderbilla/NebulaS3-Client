"use client";

import { useState, useEffect, useRef } from "react";

type HealthStatus = "loading" | "SUCCESS" | "FAILED";

export function useHealthCheck() {
  const [status, setStatus] = useState<HealthStatus>("loading");
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const checkHealthStatus = async () => {
      try {
        // Use internal API route instead of direct service call
        const response = await fetch("/api/health");

        if (!response.ok) {
          throw new Error(
            `Health check failed with status: ${response.status}`
          );
        }

        const data = await response.json();
        setStatus(data.status);

        // If health check succeeds, switch to 10-second interval
        if (data.status === "SUCCESS") {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          intervalRef.current = setInterval(checkHealthStatus, 10000);
        }
      } catch (error) {
        setStatus("FAILED");
        console.log("Health check failed", error);

        // If health check fails, switch to 5-second interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(checkHealthStatus, 5000);
      }
    };

    // Initial check
    checkHealthStatus();

    // Set initial interval to 10 seconds
    intervalRef.current = setInterval(checkHealthStatus, 10000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { status };
}
