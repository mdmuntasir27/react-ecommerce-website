import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, SlidersHorizontal, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';
import {
  fetchProducts,
  fetchCategories,
  setSearchTerm,
  setSelectedCategory,
  setSortOption,
  resetFilters,
  selectProductsStatus,
  selectProductsError,
  selectCategories,
  selectSearchTerm,
  selectSelectedCategory,
  selectSortOption,
  selectFilteredProducts,
} from '../redux/productsSlice';
import ProductCard from '../components/ProductCard';
import ProductGridSkeleton from '../components/LoadingSkeleton';
import ErrorAlert from '../components/ErrorAlert';

export const HomePage = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const categories = useSelector(selectCategories);
  const searchTerm = useSelector(selectSearchTerm);
  const selectedCategory = useSelector(selectSelectedCategory);
  const sortOption = useSelector(selectSortOption);
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleRetry = () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            Special Deals & Fast Delivery
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Discover Quality Products For Every Lifestyle
          </h1>
          <p className="text-indigo-200 text-sm md:text-base max-w-2xl mx-auto">
            Browse our wide selection of fashion, electronics, and accessories. Add your favorite items to cart with smooth Redux state management.
          </p>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder="Search products by name..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition"
            />
            {searchTerm && (
              <button
                onClick={() => dispatch(setSearchTerm(''))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm capitalize bg-white transition cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Sorting */}
          <div className="md:col-span-3">
            <select
              value={sortOption}
              onChange={(e) => dispatch(setSortOption(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white transition cursor-pointer"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating-high">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span>
            <span>products available</span>
            {selectedCategory !== 'all' && (
              <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-medium capitalize">
                Category: {selectedCategory}
              </span>
            )}
            {searchTerm && (
              <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-medium">
                Query: "{searchTerm}"
              </span>
            )}
          </div>

          {(selectedCategory !== 'all' || searchTerm !== '' || sortOption !== 'default') && (
            <button
              onClick={() => dispatch(resetFilters())}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Products Display */}
      {status === 'loading' && <ProductGridSkeleton count={8} />}

      {status === 'failed' && (
        <ErrorAlert message={error} onRetry={handleRetry} />
      )}

      {status === 'succeeded' && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
          <div className="inline-flex p-4 bg-gray-50 text-gray-400 rounded-full mb-3">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500 text-sm mb-4">
            Try adjusting your search query or clear your category filter.
          </p>
          <button
            onClick={() => dispatch(resetFilters())}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
