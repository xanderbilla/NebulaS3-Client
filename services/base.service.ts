import Cookies from "js-cookie";

export interface RequestConfig extends RequestInit {
  signal?: AbortSignal;
}

export class BaseService {
  private abortControllers: Map<string, AbortController> = new Map();

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
    if (data.status === "SUCCESS") {
      return data;
    }
    throw new Error(data.message || "Request failed");
  }

  protected async request<T>(
    endpoint: string,
    config: RequestConfig = {},
    requestId: string
  ): Promise<T> {
    // Cancel any existing request with the same ID
    this.cancelRequest(requestId);

    // Create new abort controller for this request
    const controller = new AbortController();
    this.abortControllers.set(requestId, controller);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        signal: controller.signal,
        headers: {
          ...this.getHeaders(),
          ...config.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      throw error;
    } finally {
      // Clean up abort controller
      this.abortControllers.delete(requestId);
    }
  }

  cancelRequest(requestId: string) {
    const controller = this.abortControllers.get(requestId);
    if (controller) {
      controller.abort();
    }
  }

  cancelAllRequests() {
    this.abortControllers.forEach((controller) => controller.abort());
    this.abortControllers.clear();
  }
}
