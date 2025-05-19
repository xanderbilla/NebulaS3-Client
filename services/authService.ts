import axios from "axios";

// Use server-side environment variables instead of NEXT_PUBLIC_*
// This ensures API URLs are not exposed to the client
const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

export interface LoginCredentials {
  accessKey: string;
  secretKey: string;
  region: string;
}

export interface LoginResponse {
  status: string;
  message?: string;
  data?: {
    sessionToken: string;
    accessKeyId: string;
  };
}

// This function will only be called on the server side via API routes
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/auth/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
