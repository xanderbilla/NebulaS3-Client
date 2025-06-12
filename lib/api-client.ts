import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiClient {
  private readonly client: AxiosInstance;
  private sessionToken?: string;

  constructor() {
    this.client = axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v2",
      timeout: 15000, // Reduced from 30000
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Initialize session token from localStorage
    this.initializeSession();

    // Request interceptor to add session token
    this.client.interceptors.request.use((config) => {
      if (this.sessionToken) {
        config.headers["X-Session-Token"] = this.sessionToken;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Only log unexpected errors, not handled ones
        if (error.response) {
          // Don't log 401/403 (auth errors) or bucket operation errors
          const status = error.response.status;
          const url = error.config?.url ?? "";

          // Skip logging for auth endpoints and bucket operations
          const isAuthEndpoint = url.includes("/auth/");
          const isBucketOperation = url.includes("/s3/buckets");
          const isExpectedError = status === 401 || status === 403;

          if (!isAuthEndpoint && !isBucketOperation && !isExpectedError) {
            console.error("API Error:", {
              status,
              statusText: error.response.statusText,
              url,
              method: error.config?.method?.toUpperCase(),
              data: error.response.data,
            });
          }
        } else if (error.request) {
          // Only log network errors for non-auth requests
          const url = error.config?.url ?? "";
          if (!url.includes("/auth/")) {
            console.error("Network Error:", {
              message: "No response received",
              url,
              method: error.config?.method?.toUpperCase(),
            });
          }
        } else {
          // Something else happened
          console.error("Request Setup Error:", error.message);
        }

        if (error.response?.status === 401) {
          // Clear session token on unauthorized
          this.clearSession();
        }

        // Always return an Error object
        if (error instanceof Error) {
          return Promise.reject(error);
        } else {
          return Promise.reject(new Error(String(error)));
        }
      }
    );
  }

  private initializeSession() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("sessionToken");
      if (token) {
        this.sessionToken = token;
      }
    }
  }

  setSessionToken(token: string) {
    this.sessionToken = token;
    // Store in localStorage and cookies for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("sessionToken", token);
      // Set cookie for middleware access
      document.cookie = `sessionToken=${token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; SameSite=Lax`;
    }
  }

  getSessionToken(): string | null {
    if (this.sessionToken) return this.sessionToken;

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("sessionToken");
      if (token) {
        this.sessionToken = token;
        return token;
      }
    }
    return null;
  }

  clearSession() {
    this.sessionToken = undefined;
    if (typeof window !== "undefined") {
      localStorage.removeItem("sessionToken");
      // Clear cookie
      document.cookie =
        "sessionToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
