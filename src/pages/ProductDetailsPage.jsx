import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
} from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../redux/wishlistSlice';
import { selectAllProducts } from '../redux/productsSlice';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const allProducts = useSelector(selectAllProducts);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const productIdNumber = Number(id);
  const isInWishlist = useSelector(selectIsInWishlist(productIdNumber));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);

    // First check if product is already in Redux store
    const existing = allProducts.find((p) => p.id === productIdNumber);
    if (existing) {
      setProduct(existing);
      setLoading(false);
      return;
    }

    // Otherwise fetch directly from API
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load product details');
        setLoading(false);
      });
  }, [id, allProducts, productIdNumber]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, quantity }));
    addToast(
      `Added ${quantity} ${quantity > 1 ? 'items' : 'item'} of "${product.title.slice(0, 24)}..." to cart!`,
      'success'
    );
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      addToast('Removed from wishlist', 'info');
    } else {
      addToast('Added to wishlist!', 'success');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded-lg mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-96 bg-gray-200 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-rose-900 mb-2">Product Not Found</h2>
          <p className="text-rose-700 text-sm mb-6">{error || 'The requested product does not exist.'}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Related products in the same category (excluding current)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Product Detail Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Product Image Section */}
          <div className="relative bg-white rounded-2xl p-8 border border-gray-50 flex items-center justify-center min-h-[380px] max-h-[500px]">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[380px] max-w-full object-contain"
            />
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-sm transition backdrop-blur-md ${
                isInWishlist
                  ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                  : 'bg-gray-100/80 text-gray-400 hover:text-rose-500 hover:bg-gray-200'
              }`}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{product.rating.rate}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    ({product.rating.count} customer reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="pt-2">
              <span className="text-3xl sm:text-4xl font-black text-gray-900">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-xs text-emerald-600 ml-3 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Description */}
            <div className="border-t border-b border-gray-100 py-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed capitalize">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 text-gray-600 hover:text-indigo-600 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1 text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 text-gray-600 hover:text-indigo-600 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition active:scale-95 text-sm"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart ({quantity})</span>
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`px-5 py-3.5 rounded-xl border font-semibold text-sm transition flex items-center justify-center gap-2 ${
                    isInWishlist
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current text-rose-500' : ''}`} />
                  <span>{isInWishlist ? 'Wishlisted' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Assurance badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-50 text-center">
              <div className="p-3 bg-gray-50 rounded-xl">
                <Truck className="w-5 h-5 mx-auto text-indigo-600 mb-1" />
                <span className="text-[11px] font-semibold text-gray-700 block">Fast Dispatch</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
                <span className="text-[11px] font-semibold text-gray-700 block">Authentic</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <RotateCcw className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                <span className="text-[11px] font-semibold text-gray-700 block">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Related Products in this Category
            </h2>
            <Link
              to="/"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
