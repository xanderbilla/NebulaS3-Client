import axios from "axios";

// Use server-side environment variables instead of NEXT_PUBLIC_*
// This ensures API URLs are not exposed to the client
const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

export interface HealthResponse {
  status: string;
  message?: string;
}

export const checkHealth = async (): Promise<HealthResponse> => {
  try {
    const response = await axios.get<HealthResponse>(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};
export async function checkHealth() { return { status: "OK" } }
