import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  productIds: number[];
}

const initialState: WishlistState = {
  productIds: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<number>) => {
      if (!state.productIds.includes(action.payload)) {
        state.productIds.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.productIds));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.productIds = state.productIds.filter(id => id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.productIds));
    },
    clearWishlist: (state) => {
      state.productIds = [];
      localStorage.setItem('wishlist', JSON.stringify([]));
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
