import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, totals } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleCartClick = () => {
    closeCart();
    navigate('/cart');
  };

  // Free shipping threshold calculations (₹500 threshold)
  const freeThreshold = 500;
  const remainingForFree = Math.max(0, freeThreshold - totals.subtotal);
  const progressPercent = Math.min(100, Math.round((totals.subtotal / freeThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden transform transition duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/80 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-primary flex-shrink-0" />
              <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg">
                Your Shopping Bag
              </h3>
              <span className="text-xs bg-emerald-100 text-primary font-bold px-2 py-0.5 rounded-full">
                {totals.itemCount}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-emerald-50/90 px-4 sm:px-5 py-2.5 border-b border-emerald-100 flex-shrink-0">
            {remainingForFree > 0 ? (
              <p className="text-xs text-gray-700 mb-1.5">
                Add <span className="font-bold text-primary">{formatPrice(remainingForFree)}</span> more for <strong className="text-emerald-700">FREE Delivery</strong>!
              </p>
            ) : (
              <p className="text-xs font-semibold text-emerald-800 flex items-center mb-1.5">
                🎉 Congratulations! You have unlocked FREE Delivery!
              </p>
            )}
            <div className="w-full bg-emerald-200/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List: Vertically scrollable only, horizontal overflow strictly hidden */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-5 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-serif font-semibold text-gray-800 text-base">
                  Your cart is empty
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mt-1 mb-5">
                  Explore our fresh organic produce, plants, seeds, and oils to get started!
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/products');
                  }}
                  className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-hover shadow-md transition cursor-pointer"
                >
                  Explore Organic Shop
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartItemId} className="py-3.5 flex items-center gap-3 group max-w-full overflow-hidden">
                  {/* Strict Fixed Thumbnail Size */}
                  <div className="w-16 h-16 min-w-[64px] max-w-[64px] min-h-[64px] max-h-[64px] rounded-lg border border-gray-100 bg-gray-50 overflow-hidden flex items-center justify-center flex-shrink-0 p-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = '/img/Swarna-logo.png';
                      }}
                    />
                  </div>

                  {/* Info and Controls */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-gray-400 hover:text-red-500 transition p-1 flex-shrink-0 cursor-pointer"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                        {item.variant}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {formatPrice(item.price)} each
                      </span>
                    </div>

                    {/* Quantity Selector & Item Subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-gray-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-primary transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-800 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-primary transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/90 space-y-2.5 flex-shrink-0">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPrice(totals.subtotal)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(totals.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Charges</span>
                  <span>
                    {totals.shippingFee === 0 ? (
                      <span className="text-primary font-semibold">FREE</span>
                    ) : (
                      formatPrice(totals.shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-900 pt-1.5 border-t border-gray-200">
                  <span>Total Payable</span>
                  <span className="text-base text-primary">{formatPrice(totals.total)}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-gray-500 pt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>Cash on Delivery (COD) only. Pay upon receiving order.</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={handleCartClick}
                  className="w-full py-2.5 px-3 border border-gray-300 bg-white text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-100 transition text-center cursor-pointer"
                >
                  View Full Cart
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-2.5 px-3 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover shadow-md hover:shadow-lg transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Checkout (COD)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
