import axiosInstance from './axios';
import { Cart, CartItem, AddToCartPayload, UpdateCartItemPayload, RemoveCartItemPayload, ApiResponse } from '../types';

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await axiosInstance.get<ApiResponse<Cart>>(
      '/user/cart'
    );
    return response.data.data!;
  },

  addToCart: async (payload: AddToCartPayload): Promise<CartItem> => {
    const response = await axiosInstance.post<ApiResponse<{ item: CartItem }>>(
      '/user/cart/add',
      payload
    );
    return response.data.data!.item;
  },

  updateCartItem: async (payload: UpdateCartItemPayload): Promise<CartItem> => {
    const response = await axiosInstance.put<ApiResponse<{ item: CartItem }>>(
      '/user/cart/update',
      payload
    );
    return response.data.data!.item;
  },

  removeCartItem: async (payload: RemoveCartItemPayload): Promise<void> => {
    await axiosInstance.delete('/user/cart/remove', { data: payload });
  },
};
