import { useQuery } from "@tanstack/react-query";
import type { HealthStatus } from "@/types/health";
import { healthService } from "@/lib/services/health";

// Query Keys
export const healthKeys = {
  all: ["health"] as const,
  status: () => [...healthKeys.all, "status"] as const,
} as const;

// Real API function
const healthApi = {
  checkHealth: async (): Promise<HealthStatus> => {
    const response = await healthService.checkHealth();
    // Transform API response to match expected format
    return {
      status: response.data?.status === "UP" ? "healthy" : "unhealthy",
      message:
        response.data?.message ?? response.message ?? "System status unknown",
      timestamp: response.timestamp ?? new Date().toISOString(),
      services: {
        s3: "operational",
        auth: "operational",
        api: "operational",
      },
    };
  },
};

// Hook to check system health
export function useHealthCheck() {
  return useQuery({
    queryKey: healthKeys.status(),
    queryFn: healthApi.checkHealth,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    staleTime: 20 * 1000, // 20 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
