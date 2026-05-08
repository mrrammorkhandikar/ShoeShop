import axiosInstance from './axios';
import { Product, ProductsResponse, ProductFilters, ApiResponse } from '../types';

export const productService = {
  getProducts: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    const response = await axiosInstance.get<ApiResponse<ProductsResponse>>(
      '/shop/products',
      { params: filters }
    );
    return response.data.data!;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axiosInstance.get<ApiResponse<{ product: Product }>>(
      `/shop/products/${id}`
    );
    return response.data.data!.product;
  },

  createProduct: async (formData: FormData): Promise<Product> => {
    const response = await axiosInstance.post<ApiResponse<{ product: Product }>>(
      '/admin/products',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data!.product;
  },

  updateProduct: async (id: number, formData: FormData): Promise<Product> => {
    const response = await axiosInstance.put<ApiResponse<{ product: Product }>>(
      `/admin/products/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data!.product;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/products/${id}`);
  },
};
