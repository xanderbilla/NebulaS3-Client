import { ApiResponse } from "./api";

// Request Types
export interface LoginCredentials {
  accessKey: string;
  secretKey: string;
  region: string;
}

export interface SessionValidationRequest {
  accessKey: string;
}

// Response Data Types
export interface LoginData {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  region: string;
  expiration: number;
}

// API Response Types
export type LoginResponse = ApiResponse<LoginData>;
export type SessionValidationResponse = ApiResponse<boolean>;
