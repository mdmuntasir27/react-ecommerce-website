import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { selectWishlistItems, removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import { useToast } from '../context/ToastContext';

export const WishlistPage = () => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    addToast(`"${item.title.slice(0, 24)}..." added to cart!`, 'success');
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    addToast('Item removed from wishlist', 'info');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Your Wishlist is Empty</h2>
          <p className="text-gray-500 text-sm">Save your favorite items here to review and purchase them later.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            My Wishlist
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {wishlistItems.length} saved {wishlistItems.length > 1 ? 'items' : 'item'}
          </p>
        </div>
        <Link
          to="/"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse More
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col hover:shadow-md transition"
          >
            <div className="relative bg-white p-4 h-48 flex items-center justify-center border-b border-gray-50">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain"
              />
              <button
                onClick={() => handleRemove(item.id)}
                className="absolute top-2 right-2 p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-full transition"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-3 flex flex-col flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full self-start mb-2">
                {item.category}
              </span>
              <Link
                to={`/product/${item.id}`}
                className="text-sm font-semibold text-gray-900 hover:text-indigo-600 line-clamp-2 transition mb-2"
              >
                {item.title}
              </Link>
              <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  BDT {Number(item.price).toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
