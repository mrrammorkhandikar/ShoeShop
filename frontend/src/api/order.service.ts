import axiosInstance from './axios';
import { Order, ApiResponse } from '../types';

export const orderService = {
  placeOrder: async (): Promise<Order> => {
    const response = await axiosInstance.post<ApiResponse<{ order: Order }>>(
      '/user/orders'
    );
    return response.data.data!.order;
  },

  getMyOrders: async (): Promise<Order[]> => {
    const response = await axiosInstance.get<ApiResponse<{ orders: Order[] }>>(
      '/user/orders/my-orders'
    );
    return response.data.data!.orders;
  },

  getAllOrders: async (): Promise<Order[]> => {
    const response = await axiosInstance.get<ApiResponse<{ orders: Order[] }>>(
      '/admin/orders/admin/all-orders'
    );
    return response.data.data!.orders;
  },

  updateOrderStatus: async (id: number, status: string): Promise<Order> => {
    const response = await axiosInstance.put<ApiResponse<{ order: Order }>>(
      `/admin/orders/status/${id}`,
      { status }
    );
    return response.data.data!.order;
  },
};
