import api from "@/lib/api";
import type { Category, PaginatedResponse } from "@/types/api";

export const categoryService = {
  async getAllCategories(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Category>> {
    const response = await api.get<Category[]>("/categories", { params });
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

  async createCategory(data: Omit<Category, "id">): Promise<Category> {
    const response = await api.post<Category>("/categories", data);
    return response.data!;
  },

  async updateCategory(
    id: string,
    data: Partial<Omit<Category, "id">>,
  ): Promise<Category> {
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data!;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
