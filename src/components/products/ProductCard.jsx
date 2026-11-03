import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/formatters';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState(
    product.defaultVariant || product.variants?.[0] || 'Standard'
  );
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-card-hover hover:border-emerald-200 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="bg-secondary text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isFreshArrival && (
            <span className="bg-primary text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
              Fresh Arrival
            </span>
          )}
        </div>

        <button
          onClick={handleWishlistToggle}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm ${
            inWishlist
              ? 'bg-red-50 text-red-500 hover:bg-red-100'
              : 'bg-white/90 backdrop-blur-xs text-gray-500 hover:text-red-500 hover:bg-white'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-gray-50 p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/img/Swarna-logo.png';
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <Link
            to={`/category/${product.category}`}
            className="text-[11px] font-semibold text-primary uppercase tracking-wider hover:underline block mb-1"
          >
            {product.categoryName}
          </Link>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-primary transition-colors">
            <h3 className="font-serif font-semibold text-gray-800 text-sm line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-gray-700 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-[11px] text-gray-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          {/* Variant Selector if more than 1 */}
          {product.variants && product.variants.length > 1 && (
            <div className="mb-3">
              <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                Size / Variant
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md py-1 px-2 focus:border-primary outline-none text-gray-700 font-medium"
              >
                {product.variants.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Pricing & Add to Cart button */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-base font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-gray-400 line-through ml-1.5">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`py-2 px-3.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm active:scale-95 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : product.inStock
                  ? 'bg-primary hover:bg-primary-hover text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Add to cart"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

