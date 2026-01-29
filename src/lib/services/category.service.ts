import api from "@/lib/api";
import type { Category } from "@/types/api";

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>("/categories");
    return response.data || [];
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
