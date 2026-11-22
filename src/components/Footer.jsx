import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RefreshCcw, Headphones } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      {/* Service Highlights */}
      <div className="border-b border-gray-100 bg-gray-50/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Free Express Shipping</h4>
                <p className="text-xs text-gray-500">On all orders above $50</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">100% Secure Checkout</h4>
                <p className="text-xs text-gray-500">Protected by 256-bit SSL</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">30-Day Hassle Free Returns</h4>
                <p className="text-xs text-gray-500">Shop with complete confidence</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">24/7 Dedicated Support</h4>
                <p className="text-xs text-gray-500">Always ready to assist you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">SwiftCart</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Your premier online shopping destination for premium electronics, jewelry, men's and women's apparel. Built with React.js and Redux Toolkit.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 text-sm mb-3">Quick Navigation</h5>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-indigo-600 transition">Home Catalog</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-600 transition">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-indigo-600 transition">Wishlist</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 text-sm mb-3">Product Categories</h5>
            <ul className="space-y-2 text-sm text-gray-500 capitalize">
              <li>Electronics</li>
              <li>Jewelery</li>
              <li>Men's Clothing</li>
              <li>Women's Clothing</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} SwiftCart E-Commerce. All rights reserved.</p>
          <p>Assignment Project built with React.js and Redux Toolkit</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
