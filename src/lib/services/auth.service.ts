import api from "@/lib/api";

import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "@/types/api";
import { removeAuthToken, setAuthToken } from "@/utils/auth";

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data, {
      skipAutoRedirect: true,
    });

    const responseData = (response.data || response) as any;

    return (responseData as AuthResponse) || response.data!;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data, {
      skipAutoRedirect: true,
      credentials: "include",
    });

    const responseData = (response.data || response) as any;

    if (responseData && responseData.user) {
      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
        setAuthToken(responseData.token);
      }
      localStorage.setItem("user", JSON.stringify(responseData.user));
      return responseData as AuthResponse;
    }

    throw new Error("Invalid server response");
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>("/auth/me");
    return response.data!;
  },

  async logout() {
    try {
      removeAuthToken()
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;

    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token") || !!localStorage.getItem("user");
  },
};
