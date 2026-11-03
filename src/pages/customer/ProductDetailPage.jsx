import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  ChevronRight,
  Leaf
} from 'lucide-react';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/formatters';
import ProductCard from '../../components/products/ProductCard';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const res = await productService.getProductById(productId);
      const prod = res.data;
      setProduct(prod);
      setSelectedImage(prod.image);
      const defaultVar = prod.defaultVariant || prod.variants?.[0] || 'Standard';
      setSelectedVariant(defaultVar);
      setQuantity(1);

      // Fetch related products in same category
      const relRes = await productService.getProducts({ category: prod.category, limit: 4 });
      setRelatedProducts((relRes.data || []).filter((p) => p.id !== prod.id).slice(0, 4));
    } catch (err) {
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="h-96 bg-gray-100 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded-md w-3/4" />
            <div className="h-4 bg-gray-100 rounded-md w-1/2" />
            <div className="h-12 bg-gray-100 rounded-xl" />
            <div className="h-32 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-gray-800">Product Not Found</h2>
        <p className="text-xs text-gray-500 mt-2 mb-6">The requested item may have been moved or discontinued.</p>
        <Link
          to="/products"
          className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover shadow-md"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/products" className="hover:text-primary transition">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to={`/category/${product.category}`} className="hover:text-primary transition">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main Showcase Grid */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Product Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-6 flex items-center justify-center relative group">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = '/img/Swarna-logo.png';
                }}
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl border-2 p-1.5 bg-gray-50 flex-shrink-0 transition ${
                      selectedImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-400 font-mono">SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Offer Price</span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-primary border border-emerald-200">
                Inclusive of all taxes
              </span>
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Select Size / Variant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                        selectedVariant === v
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Stock Availability */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Quantity:
                </label>
                <span
                  className={`text-xs font-semibold ${
                    product.stock > 0 ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Currently Out of Stock'}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || !product.inStock}
                    className="p-2.5 text-gray-600 hover:text-primary transition disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock || 50, q + 1))}
                    disabled={quantity >= (product.stock || 50) || !product.inStock}
                    className="p-2.5 text-gray-600 hover:text-primary transition disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Wishlist Toggle */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-xl border transition flex items-center space-x-1.5 text-xs font-semibold ${
                    inWishlist
                      ? 'bg-red-50 text-red-500 border-red-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:text-red-500 hover:border-red-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">
                    {inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
                  </span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`py-3.5 px-6 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition active:scale-95 ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : product.inStock
                    ? 'bg-primary hover:bg-primary-hover text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="py-3.5 px-6 rounded-xl text-xs font-bold bg-secondary hover:bg-secondary-hover text-white flex items-center justify-center space-x-2 shadow-md transition active:scale-95 disabled:opacity-50"
              >
                <span>Buy Now (COD)</span>
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="border-t border-gray-100 pt-5 grid grid-cols-2 gap-4 text-xs text-gray-600">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                <span>100% Cash on Delivery Only</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Free Shipping over ₹500</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <RotateCcw className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Easy Return & Exchange</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Leaf className="w-4 h-4 text-primary flex-shrink-0" />
                <span>100% Certified Organic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description Tabs / Features */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 space-y-6">
          <h3 className="font-serif font-bold text-xl text-gray-900 border-b border-gray-100 pb-3">
            Product Description & Features
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
            {product.description}
          </p>

          {product.features && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                Key Organic Highlights:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-gray-600">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs text-gray-600">
            <div>
              <strong className="block text-gray-900 font-semibold mb-1">Storage Instructions:</strong>
              <p>{product.storageInstructions || 'Store in a cool, dry place away from direct sunlight.'}</p>
            </div>
            <div>
              <strong className="block text-gray-900 font-semibold mb-1">Delivery & COD:</strong>
              <p>{product.shippingInfo || 'Dispatched safely within 24-48 hours. Cash on Delivery supported.'}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-2xl text-gray-900">
              Related Organic Products
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

