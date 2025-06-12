import { apiClient } from "@/lib/api-client";
import { HealthResponse } from "@/types/health";

export const healthService = {
  checkHealth: async (): Promise<HealthResponse> => {
    return apiClient.get<HealthResponse>("/health");
  },
};
