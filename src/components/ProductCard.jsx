import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../redux/wishlistSlice';
import { useToast } from '../context/ToastContext';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    addToast(`"${product.title.slice(0, 24)}..." added to your cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      addToast('Removed from wishlist', 'info');
    } else {
      addToast('Added to wishlist!', 'success');
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top action: Wishlist button */}
      <button
        onClick={handleToggleWishlist}
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
          isInWishlist
            ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
            : 'bg-white/80 text-gray-400 hover:text-rose-500 hover:bg-white'
        }`}
      >
        <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image Link */}
      <Link
        to={`/product/${product.id}`}
        className="block relative bg-white p-6 h-56 flex items-center justify-center overflow-hidden border-b border-gray-50"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category Badge & Rating */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            {product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating.rate}</span>
              <span className="text-gray-400 font-normal">({product.rating.count})</span>
            </div>
          )}
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 text-sm md:text-base leading-snug mb-2"
          title={product.title}
        >
          {product.title}
        </Link>

        {/* Price and Add to Cart Button */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Price</span>
            <span className="text-xl font-bold text-gray-900">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs md:text-sm font-semibold rounded-xl shadow-md shadow-indigo-100 transition-all active:scale-95"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
