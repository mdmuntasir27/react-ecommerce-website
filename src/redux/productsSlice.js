import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products from the server.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'An unknown network error occurred.');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch product categories.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch categories.');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    categoriesStatus: 'idle',
    error: null,
    searchTerm: '',
    selectedCategory: 'all',
    sortOption: 'default', // 'default' | 'price-low-high' | 'price-high-low' | 'rating-high'
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.sortOption = 'default';
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = 'failed';
      });
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setSortOption,
  resetFilters,
} = productsSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectCategories = (state) => state.products.categories;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSortOption = (state) => state.products.sortOption;

// Selector to get filtered and sorted products
export const selectFilteredProducts = (state) => {
  const { items, searchTerm, selectedCategory, sortOption } = state.products;

  let result = [...items];

  // Category filtering
  if (selectedCategory && selectedCategory !== 'all') {
    result = result.filter(
      (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Search filtering by name / title
  if (searchTerm && searchTerm.trim() !== '') {
    const query = searchTerm.toLowerCase().trim();
    result = result.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }

  // Sorting
  if (sortOption === 'price-low-high') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high-low') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'rating-high') {
    result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
  }

  return result;
};

export default productsSlice.reducer;
