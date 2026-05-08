import axiosInstance from './axios';
import { AuthResponse, LoginPayload, SignupPayload, ApiResponse } from '../types';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      payload
    );
    return response.data.data!;
  },

  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      '/auth/signup',
      payload
    );
    return response.data.data!;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
