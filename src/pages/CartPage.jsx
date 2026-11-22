import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../redux/cartSlice';
import { useToast } from '../context/ToastContext';
import ConfirmModal from '../components/ConfirmModal';

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  // Confirmation Modal state
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    action: null,
  });

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      // Show confirmation prompt before removing product when quantity is 1
      setModalConfig({
        isOpen: true,
        title: 'Remove item from cart?',
        message: `Are you sure you want to remove "${item.title.slice(0, 30)}..." from your cart?`,
        action: () => {
          dispatch(decreaseQuantity(item.id));
          addToast('Item removed from cart', 'info');
          closeModal();
        },
      });
    } else {
      dispatch(decreaseQuantity(item.id));
    }
  };

  const handleRemove = (item) => {
    setModalConfig({
      isOpen: true,
      title: 'Remove item from cart?',
      message: `Are you sure you want to remove "${item.title.slice(0, 30)}..." from your cart?`,
      action: () => {
        dispatch(removeFromCart(item.id));
        addToast('Item removed from cart', 'info');
        closeModal();
      },
    });
  };

  const handleClearCart = () => {
    setModalConfig({
      isOpen: true,
      title: 'Clear entire shopping cart?',
      message: 'This will remove all items currently in your cart. This action cannot be undone.',
      action: () => {
        dispatch(clearCart());
        addToast('Shopping cart cleared', 'info');
        closeModal();
      },
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      title: '',
      message: '',
      action: null,
    });
  };

  // Calculations
  const shipping = totalAmount > 50 || totalAmount === 0 ? 0 : 9.99;
  const estimatedTax = totalAmount * 0.05; // 5% tax
  const finalTotal = totalAmount + shipping + estimatedTax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Your shopping cart is empty</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our wide range of products and find something you love!
            </p>
          </div>
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition active:scale-95 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your {totalQuantity} {totalQuantity > 1 ? 'items' : 'item'} before checking out.
          </p>
        </div>

        <button
          onClick={handleClearCart}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => {
            const itemSubtotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 transition hover:shadow-md"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.id}`}
                  className="w-24 h-24 p-2 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <Link
                    to={`/product/${item.id}`}
                    className="block text-sm sm:text-base font-semibold text-gray-900 hover:text-indigo-600 transition truncate"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    Unit Price: <span className="font-semibold text-gray-700">${Number(item.price).toFixed(2)}</span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="p-2 text-gray-600 hover:text-indigo-600 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-sm font-bold text-gray-900 min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="p-2 text-gray-600 hover:text-indigo-600 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right sm:min-w-[100px]">
                  <span className="text-xs text-gray-400 block sm:hidden">Total:</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    ${itemSubtotal.toFixed(2)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item)}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6 sticky top-24">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({totalQuantity} items)</span>
              <span className="font-semibold text-gray-900">${totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span>Estimated Shipping</span>
                {shipping === 0 && (
                  <span className="text-xs text-emerald-600 font-semibold block">
                    Free shipping applied!
                  </span>
                )}
              </div>
              <span className="font-semibold text-gray-900">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax (5%)</span>
              <span className="font-semibold text-gray-900">${estimatedTax.toFixed(2)}</span>
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
              <span>Total Price</span>
              <span className="text-xl text-indigo-600">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition active:scale-95 text-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-50 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Free delivery on orders over $50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.action}
        onCancel={closeModal}
        confirmText="Remove"
        isDanger={true}
      />
    </div>
  );
};

export default CartPage;
