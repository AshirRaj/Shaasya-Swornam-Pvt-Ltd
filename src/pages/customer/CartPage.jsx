import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totals,
    appliedCoupon,
    applyCouponCode,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError('');
    setCouponLoading(true);
    try {
      await applyCouponCode(couponInput.trim());
      setCouponInput('');
    } catch (err) {
      setCouponError(err.message || 'Invalid coupon code');
    } finally {
      setCouponLoading(false);
    }
  };

  const freeThreshold = 500;
  const remainingForFree = Math.max(0, freeThreshold - totals.subtotal);
  const progressPercent = Math.min(100, Math.round((totals.subtotal / freeThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 text-center bg-white p-12 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="w-20 h-20 bg-emerald-50 text-primary rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Your shopping bag is empty
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            You haven't added any items to your bag yet. Browse our pure organic products to fill it up!
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover shadow-md transition"
            >
              <span>Explore Organic Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Shopping Cart</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Your Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Review your items before proceeding to Cash on Delivery checkout.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-500 hover:text-red-700 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
          <div className="flex justify-between items-center text-xs text-gray-700 mb-2">
            <span>
              {remainingForFree > 0 ? (
                <>Add <strong className="text-primary">{formatPrice(remainingForFree)}</strong> more to get <strong>FREE Delivery</strong></>
              ) : (
                <strong className="text-emerald-700">🎉 FREE Delivery unlocked!</strong>
              )}
            </span>
            <span className="font-bold text-gray-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Content: Items List + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
              {items.map((item) => (
                <div key={item.cartItemId} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 min-w-[64px] min-h-[64px] max-w-[80px] max-h-[80px] rounded-xl bg-gray-50 border border-gray-100 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/img/Swarna-logo.png';
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase">
                        {item.categoryName}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-gray-900 leading-snug">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                          {item.variant}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatPrice(item.price)} each
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end sm:space-x-6 border-t sm:border-t-0 pt-2 sm:pt-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1.5 text-gray-600 hover:text-primary transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1.5 text-gray-600 hover:text-primary transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-gray-900 block">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="p-1 text-gray-400 hover:text-red-500 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                to="/products"
                className="text-xs font-semibold text-primary hover:underline flex items-center space-x-1"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary & Coupon Card */}
          <div className="space-y-6">
            {/* Coupon Code Section */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span>Apply Promo Code</span>
              </h4>

              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 block">
                      {appliedCoupon.code} Applied!
                    </span>
                    <span className="text-[11px] text-emerald-600">
                      Saved {formatPrice(totals.discount)}
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-500 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="e.g. ORGANIC10"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      className="flex-1 px-3 py-2 text-xs uppercase border border-gray-200 rounded-lg focus:border-primary outline-none"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 transition"
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-500">{couponError}</p>
                  )}
                  <p className="text-[10px] text-gray-400">
                    Try <strong>ORGANIC10</strong> (10% off &gt; ₹499) or <strong>NATURE50</strong> (Flat ₹50 off)
                  </p>
                </form>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal ({totals.itemCount} items)</span>
                  <span className="font-semibold text-gray-900">{formatPrice(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(totals.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {totals.shippingFee === 0 ? (
                      <span className="text-primary font-bold">FREE</span>
                    ) : (
                      formatPrice(totals.shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-primary text-xl font-serif">
                    {formatPrice(totals.total)}
                  </span>
                </div>
              </div>

              {/* Cash on Delivery Notice */}
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Cash on Delivery (COD) only:</strong> No card or netbanking needed. You pay in cash at your doorstep when your package is delivered safely.
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

