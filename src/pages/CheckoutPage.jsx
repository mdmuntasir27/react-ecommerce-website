import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import {
  selectCartItems,
  selectCartTotalAmount,
  clearCart,
} from '../redux/cartSlice';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = totalAmount > 50 || totalAmount === 0 ? 0 : 9.99;
  const estimatedTax = totalAmount * 0.05;
  const finalTotal = totalAmount + shipping + estimatedTax;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      addToast('Your cart is empty', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderComplete(true);
      dispatch(clearCart());
      addToast('Order placed successfully!', 'success');
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-gray-500">
              We have received your order and are getting it ready for shipment.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 text-sm border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-gray-900">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Recipient:</span>
              <span className="font-semibold text-gray-900">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-semibold text-gray-900">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Paid:</span>
              <span className="font-bold text-indigo-600">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition active:scale-95 text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-500 text-sm">Please add some items to your cart before proceeding to checkout.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Secure Checkout
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Complete your shipping address and payment details below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping & Payment Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-gray-900 font-bold text-lg border-b border-gray-100 pb-3">
              <Truck className="w-5 h-5 text-indigo-600" />
              <span>1. Shipping Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Shopping Avenue, Suite 4B"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Postal / ZIP Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-gray-900 font-bold text-lg border-b border-gray-100 pb-3">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <span>2. Payment Method</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <span className="font-semibold text-sm text-gray-900 block">Credit / Debit Card</span>
                  <span className="text-xs text-gray-500">Visa, Mastercard, American Express</span>
                </div>
                <Lock className="w-4 h-4 text-gray-400" />
              </label>

              <label className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 hover:border-gray-300 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <span className="font-semibold text-sm text-gray-900 block">Cash on Delivery</span>
                  <span className="text-xs text-gray-500">Pay cash upon package arrival</span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition active:scale-95 text-base flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Processing Order...</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Place Order (${finalTotal.toFixed(2)})</span>
              </>
            )}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
            Order Review ({cartItems.length} items)
          </h2>

          {/* Item Mini List */}
          <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × ${Number(item.price).toFixed(2)}
                  </p>
                </div>
                <span className="text-xs font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 text-sm text-gray-600 pt-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (5%)</span>
              <span className="font-semibold text-gray-900">${estimatedTax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
              <span>Total</span>
              <span className="text-xl text-indigo-600">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
