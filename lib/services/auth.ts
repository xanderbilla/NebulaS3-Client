import { apiClient } from "@/lib/api-client";
import {
  LoginCredentials,
  LoginResponse,
  SessionValidationRequest,
  SessionValidationResponse,
} from "@/types/auth";

export const authService = {
  login: async (
    credentials: Omit<LoginCredentials, "region">
  ): Promise<LoginResponse> => {
    const loginData = {
      ...credentials,
      region: "ap-south-1", // Hardcoded as per requirements
    };

    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      loginData
    );

    // Store session token if login is successful
    if (response.data?.sessionToken) {
      apiClient.setSessionToken(response.data.sessionToken);
    }

    return response;
  },

  validateSession: async (
    accessKey: string
  ): Promise<SessionValidationResponse> => {
    const request: SessionValidationRequest = { accessKey };
    return apiClient.post<SessionValidationResponse>(
      "/auth/validate-session",
      request
    );
  },

  logout: () => {
    apiClient.clearSession();
  },

  getSessionToken: () => {
    return apiClient.getSessionToken();
  },

  setSessionToken: (token: string) => {
    apiClient.setSessionToken(token);
  },

  isAuthenticated: () => {
    return !!apiClient.getSessionToken();
  },
};
