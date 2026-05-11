import axiosInstance from './axios';
import { User, ApiResponse } from '../types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<ApiResponse<{ users: User[] }>>(
      '/admin/users'
    );
    return response.data.data!.users;
  },

  updateUser: async (id: number, data: { name?: string; email?: string; role?: string }): Promise<User> => {
    const response = await axiosInstance.put<ApiResponse<{ user: User }>>(
      `/admin/users/${id}`,
      data
    );
    return response.data.data!.user;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/users/${id}`);
  },
};
