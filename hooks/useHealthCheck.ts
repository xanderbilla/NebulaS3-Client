import { useQuery } from "@tanstack/react-query";
import type { HealthStatus } from "@/types/health";

// Query Keys
export const healthKeys = {
  all: ['health'] as const,
  status: () => [...healthKeys.all, 'status'] as const,
} as const;

// Simulated API function
const healthApi = {
  checkHealth: async (): Promise<HealthStatus> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Hardcoded to always return healthy for demo
    return {
      status: 'healthy',
      message: 'All systems operational',
      timestamp: new Date().toISOString(),
      services: {
        s3: 'operational',
        auth: 'operational',
        api: 'operational',
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
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
