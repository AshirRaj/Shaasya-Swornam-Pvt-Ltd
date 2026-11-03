import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ChevronRight, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product) => {
    addItem(product, product.defaultVariant || product.variants?.[0], 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">My Wishlist</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 flex items-center space-x-3">
              <Heart className="w-7 h-7 text-red-500 fill-current" />
              <span>Your Saved Wishlist</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              You have {items.length} {items.length === 1 ? 'item' : 'items'} saved in your wishlist.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-semibold text-red-500 hover:text-red-700 transition"
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="font-serif font-bold text-xl text-gray-800">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore our fresh organic catalogue and tap the heart icon on your favorite items to save them for later!
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover shadow-md transition"
              >
                <span>Discover Organic Goods</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between group hover:shadow-md transition"
              >
                <div>
                  <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden p-3 relative mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 text-gray-400 hover:text-red-500 rounded-full flex items-center justify-center shadow-xs"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Link to={`/category/${product.category}`} className="text-[10px] font-bold text-primary uppercase">
                    {product.categoryName}
                  </Link>
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-serif font-semibold text-sm text-gray-800 group-hover:text-primary transition line-clamp-2 mt-0.5">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-base font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.mrp)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 py-2 px-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center justify-center space-x-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

