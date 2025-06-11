import type { LoginResponse, SessionValidationResponse } from "@/types/auth";

// Mock login response based on actual API
export const mockLoginResponse: LoginResponse = {
  statusCode: 200,
  message: "Login successful",
  timestamp: "2025-06-12T00:04:19.719163",
  data: {
    accessKeyId: "MOCK_ACCESS_KEY_ID_123456789",
    secretAccessKey: "MOCK_SECRET_ACCESS_KEY_abcdefghijklmnop",
    sessionToken: "MOCK_SESSION_TOKEN_" + Date.now().toString(),
    region: "ap-south-1",
    expiration: 1749670459,
  },
  status: "SUCCESS",
};

// Mock session validation response
export const mockSessionValidationResponse: SessionValidationResponse = {
  statusCode: 200,
  message: "Session is valid",
  timestamp: "2025-06-12T00:06:04.767923",
  data: true,
  status: "SUCCESS",
};

// Mock invalid session response
export const mockInvalidSessionResponse: SessionValidationResponse = {
  statusCode: 401,
  message: "Session is invalid or expired",
  timestamp: "2025-06-12T00:06:04.767923",
  data: false,
  status: "FAILED",
};
