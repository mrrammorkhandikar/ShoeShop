import axiosInstance from './axios';
import { User, ApiResponse } from '../types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<ApiResponse<{ users: User[] }>>(
      '/admin/users'
    );
    return response.data.data!.users;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/users/${id}`);
  },
};
