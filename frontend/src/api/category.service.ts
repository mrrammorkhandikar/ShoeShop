import axiosInstance from './axios';
import { Category, ApiResponse } from '../types';

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await axiosInstance.get<ApiResponse<{ categories: Category[] }>>(
      '/shop/categories'
    );
    return response.data.data!.categories;
  },

  createCategory: async (data: { name: string; description?: string }): Promise<Category> => {
    const response = await axiosInstance.post<ApiResponse<{ category: Category }>>(
      '/admin/categories',
      data
    );
    return response.data.data!.category;
  },

  updateCategory: async (id: number, data: { name: string; description?: string }): Promise<Category> => {
    const response = await axiosInstance.put<ApiResponse<{ category: Category }>>(
      `/admin/categories/${id}`,
      data
    );
    return response.data.data!.category;
  },

  deleteCategory: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/categories/${id}`);
  },
};
