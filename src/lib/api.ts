const API_URL = process.env.BACKEND_URL || "http://localhost:8080/api/v1";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
  skipAutoRedirect?: boolean;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  private buildURL(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
  ): string {
    const url = new URL(`${this.baseURL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(
    response: Response,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    let data: unknown;

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      if (response.status === 401 && !config?.skipAutoRedirect) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }

      const maybeObj = data as {
        message?: string;
        error?: { message?: string };
      };
      throw new Error(
        maybeObj?.message ||
          maybeObj?.error?.message ||
          `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return data as ApiResponse<T>;
  }

  async get<T>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, config?.params);
    const token = this.getAuthToken();

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config?.headers,
      },
      ...config,
    });

    return this.handleResponse<T>(response, config);
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, config?.params);
    const token = this.getAuthToken();

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response, config);
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, config?.params);
    const token = this.getAuthToken();

    const response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response, config);
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, config?.params);
    const token = this.getAuthToken();

    const response = await fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response, config);
  }

  async delete<T>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, config?.params);
    const token = this.getAuthToken();

    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...config?.headers,
      },
      ...config,
    });

    return this.handleResponse<T>(response, config);
  }
}

const api = new ApiClient(API_URL);

export default api;
export type { ApiClient };
