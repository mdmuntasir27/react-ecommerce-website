import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, ShoppingCart, Heart, Menu, X, Sparkles } from 'lucide-react';
import { selectCartTotalQuantity } from '../redux/cartSlice';
import { selectWishlistItems } from '../redux/wishlistSlice';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const wishlistItems = useSelector(selectWishlistItems);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
                SwiftCart
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-700 rounded-full">
                Shop
              </span>
              <span className="hidden sm:inline-block ml-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700 rounded-full">
                BDT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors hover:text-indigo-600 ${
                  isActive ? 'text-indigo-600' : 'text-gray-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors flex items-center gap-1.5 hover:text-indigo-600 ${
                  isActive ? 'text-indigo-600' : 'text-gray-600'
                }`
              }
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
              {wishlistItems.length > 0 && (
                <span className="px-1.5 py-0.5 text-xs bg-rose-100 text-rose-600 font-bold rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Cart Icon & Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all border border-gray-100"
              aria-label={`Cart with ${cartTotalQuantity} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-semibold">Cart</span>
              <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-indigo-600 text-white text-xs font-bold rounded-full shadow-sm">
                {cartTotalQuantity}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in space-y-2">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-base font-semibold transition ${
                  isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold transition ${
                  isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Wishlist</span>
              </div>
              {wishlistItems.length > 0 && (
                <span className="px-2 py-0.5 text-xs bg-rose-100 text-rose-600 font-bold rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold transition ${
                  isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                <span>Shopping Cart</span>
              </div>
              <span className="px-2 py-0.5 text-xs bg-indigo-600 text-white font-bold rounded-full">
                {cartTotalQuantity} items
              </span>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
