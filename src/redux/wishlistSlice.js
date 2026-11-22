import { createSlice } from '@reduxjs/toolkit';

const loadInitialWishlist = () => {
  try {
    const saved = localStorage.getItem('swiftcart_wishlist_items');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Error loading wishlist from localStorage', err);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadInitialWishlist(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find(item => item.id === product.id);
      if (!exists) {
        state.items.push(product);
        localStorage.setItem('swiftcart_wishlist_items', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      localStorage.setItem('swiftcart_wishlist_items', JSON.stringify(state.items));
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(item => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      localStorage.setItem('swiftcart_wishlist_items', JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (productId) => (state) =>
  state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;
