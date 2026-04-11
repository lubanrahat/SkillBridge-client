import api from "@/lib/api";
import type { Booking, PaginatedResponse, User } from "@/types/api";

export interface AdminUserSummary extends Pick<
  User,
  "id" | "name" | "email" | "role" | "status" | "createdAt"
> {
  tutorProfile?: {
    id: string;
    bio?: string | null;
    hourlyRate: number;
    subjects: string[];
  } | null;
}

export type AdminBookingSummary = Booking;

export interface PlatformStatistics {
  totalUsers: number;
  totalStudents: number;
  totalTutors: number;
  totalBookings: number;
  totalCompletedBookings: number;
  totalCategories: number;
  totalRevenue: number;
  userDistribution: Array<{ name: string; value: number }>;
  bookingDistribution: Array<{ name: string; value: number }>;
  revenueTrend: Array<{ name: string; value: number }>;
  recentBookings: Array<{
    id: string;
    student: { id: string; name: string };
    tutor: { id: string; name: string };
    createdAt: string;
    status: string;
  }>;
}

export const adminService = {
  async getStatistics(): Promise<PlatformStatistics> {
    const res = await api.get<PlatformStatistics>("/admin/statistics");
    return res.data!;
  },

  async getUsers(params?: {
    role?: "STUDENT" | "TUTOR" | "ADMIN";
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<AdminUserSummary>> {
    const res = await api.get<AdminUserSummary[]>("/admin/users", {
      params,
    });
    return {
      data: res.data || [],
      pagination: res.meta?.pagination || {
        page: 1,
        limit: 9,
        total: res.data?.length || 0,
        totalPages: 1,
      },
    };
  },

  async getBookings(params?: {
    status?: string;
    tutorId?: string;
    studentId?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<AdminBookingSummary>> {
    const res = await api.get<AdminBookingSummary[]>("/admin/bookings", {
      params,
    });
    return {
      data: res.data || [],
      pagination: res.meta?.pagination || {
        page: 1,
        limit: 9,
        total: res.data?.length || 0,
        totalPages: 1,
      },
    };
  },

  async updateUserStatus(
    id: string,
    status: string,
  ): Promise<{ message: string }> {
    const res = await api.patch<{ message: string }>(`/admin/users/${id}`, {
      status,
    });
    return res.data!;
  },
};
