import Cookies from "js-cookie";

export interface RequestConfig extends RequestInit {}

export class BaseService {
  constructor(protected readonly baseURL: string) {}

  protected getHeaders() {
    const sessionToken = Cookies.get("sessionToken");
    if (!sessionToken) {
      throw new Error("No authentication token found. Please log in again.");
    }

    return {
      "Content-Type": "application/json",
      sessionToken,
    };
  }

  protected async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      Cookies.remove("sessionToken");
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw response data:", data);

    // Handle different response formats
    if (data.status === "SUCCESS") {
      return data;
    } else if (data.url) {
      // Handle presigned URL response format
      return data;
    } else if (data.data) {
      // Handle response with data wrapper
      return data.data;
    }

    throw new Error(data.message || "Request failed");
  }

  protected async request<T>(
    endpoint: string,
    config: RequestConfig = {},
    requestId: string
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        headers: {
          ...this.getHeaders(),
          ...config.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }
}
