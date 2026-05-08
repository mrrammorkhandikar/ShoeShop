import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
  cartId: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  cartId: null,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCart: (state, action: PayloadAction<{ cartId: number; items: CartItem[] }>) => {
      state.cartId = action.payload.cartId;
      state.items = action.payload.items;
      state.error = null;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateItem: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.cartId = null;
    },
  },
});

export const { setLoading, setError, setCart, addItem, updateItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
