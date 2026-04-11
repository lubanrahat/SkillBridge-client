import api from "@/lib/api";
import type {
  TutorProfile,
  CreateTutorProfileRequest,
  UpdateAvailabilityRequest,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

export const tutorService = {
  async getAllTutors(
    params?: PaginationParams,
  ): Promise<PaginatedResponse<TutorProfile>> {
    const queryParams: Record<string, string> = {};

    if (params) {
      if (params.page) queryParams.page = params.page.toString();
      if (params.limit) queryParams.limit = params.limit.toString();
      if (params.search) queryParams.search = params.search;
      if (params.categoryId) queryParams.categoryId = params.categoryId;
      if (params.minRate) queryParams.minRate = params.minRate.toString();
      if (params.maxRate) queryParams.maxRate = params.maxRate.toString();
    }

    const response = await api.get<TutorProfile[]>("/tutors", {
      params: queryParams,
    });

    return {
      data: response.data || [],
      pagination: response.meta?.pagination || {
        page: 1,
        limit: 9,
        total: response.data?.length || 0,
        totalPages: 1,
      },
    };
  },

  async getTutorById(id: string): Promise<TutorProfile> {
    const response = await api.get<TutorProfile>(`/tutors/${id}`);
    return response.data!;
  },

  async createOrUpdateProfile(
    data: CreateTutorProfileRequest,
  ): Promise<TutorProfile> {
    const response = await api.put<TutorProfile>("/tutors/profile", data);
    return response.data!;
  },

  async updateAvailability(
    data: UpdateAvailabilityRequest,
  ): Promise<TutorProfile> {
    const response = await api.put<TutorProfile>("/tutors/availability", data);
    return response.data!;
  },

  async getTutorProfile(): Promise<TutorProfile> {
    const response = await api.get<TutorProfile>("/tutors/profile");
    return response.data!;
  },

  async searchTutors(query: string, subject?: string): Promise<TutorProfile[]> {
    const params: Record<string, string> = { search: query };
    if (subject) params.subject = subject;

    const response = await api.get<TutorProfile[]>("/tutors", {
      params,
    });

    return response.data || [];
  },
};
