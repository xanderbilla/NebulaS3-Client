import { ApiResponse } from "./api";

// Health Status for individual services
export type ServiceStatus = 'operational' | 'degraded' | 'down';

// Health Check Response Data
export interface HealthData {
  status: string;
  message?: string;
}

// Detailed Health Status
export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  message: string;
  timestamp: string;
  services: {
    s3: ServiceStatus;
    auth: ServiceStatus;
    api: ServiceStatus;
  };
}

// API Response Type
export type HealthResponse = ApiResponse<HealthData>;
