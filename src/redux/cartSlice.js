import { createSlice } from '@reduxjs/toolkit';

// Load cart items from localStorage if available
const loadInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('swiftcart_cart_items');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (err) {
    console.error('Error loading cart from localStorage', err);
    return [];
  }
};

const initialState = {
  items: loadInitialCart(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. addToCart: Add a product to the shopping cart
    addToCart: (state, action) => {
      const product = action.payload;
      const quantityToAdd = product.quantity || 1;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating,
          quantity: quantityToAdd,
        });
      }
      localStorage.setItem('swiftcart_cart_items', JSON.stringify(state.items));
    },

    // 2. removeFromCart: Remove a product from the shopping cart
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      localStorage.setItem('swiftcart_cart_items', JSON.stringify(state.items));
    },

    // 3. increaseQuantity: Increase the quantity of a selected product
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
        localStorage.setItem('swiftcart_cart_items', JSON.stringify(state.items));
      }
    },

    // 4. decreaseQuantity: Decrease the quantity of a selected product
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // If quantity reaches 1 and decreased, remove from cart
          state.items = state.items.filter(item => item.id !== productId);
        }
        localStorage.setItem('swiftcart_cart_items', JSON.stringify(state.items));
      }
    },

    // 5. clearCart: Remove all products from the shopping cart
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('swiftcart_cart_items', JSON.stringify([]));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalAmount = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
