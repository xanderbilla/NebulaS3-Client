"use client";
import { cn } from "@/lib/utils";
import { healthCheck } from "@/services/bucketService";
import React, { useEffect, useState } from "react";

interface HealthCheckProps {
  className?: string;
}

export default function HealthCheck({ className = "" }: HealthCheckProps) {
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await healthCheck();
        setStatus(response.status);
      } catch (error) {
        setStatus("FAILED");
        console.log("Health check failed", error);
      }
    };

    checkHealth();

    const interval = setInterval(checkHealth, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300",
        className
      )}
    >
      {status === "loading" ? (
        <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center">
          <svg
            className="animate-spin w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Connecting...
        </span>
      ) : status === "SUCCESS" ? (
        <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Connected to server
        </span>
      ) : (
        <span className="text-red-600 dark:text-red-400 font-medium flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          Connection failed
        </span>
      )}
    </div>
  );
}
