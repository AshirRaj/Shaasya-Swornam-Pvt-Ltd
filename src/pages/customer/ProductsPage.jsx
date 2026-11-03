import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, ChevronRight } from 'lucide-react';
import ProductCard from '../../components/products/ProductCard';
import { productService } from '../../services/productService';
import { CATEGORIES } from '../../data/categories';

export default function ProductsPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });

  // Filter States
  const activeCategory = categorySlug || searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popularity');
  const [priceRange, setPriceRange] = useState(Number(searchParams.get('maxPrice')) || 2500);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(categorySlug || searchParams.get('category') || 'all');
  }, [categorySlug, searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, priceRange, searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const page = Number(searchParams.get('page')) || 1;
      const search = searchParams.get('q') || searchParams.get('search') || undefined;
      const res = await productService.getProducts({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        sort: sortBy,
        maxPrice: priceRange,
        search,
        page,
        limit: 12
      });
      setProducts(res.data || []);
      setPagination(res.pagination || { page: 1, total: 0, totalPages: 1 });
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
    setMobileFilterOpen(false);
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', val);
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/products" className="hover:text-primary transition">Products</Link>
            {activeCategoryObj && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-primary font-semibold">{activeCategoryObj.name}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                {activeCategoryObj ? activeCategoryObj.name : 'All Organic Products'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
                {activeCategoryObj
                  ? activeCategoryObj.description
                  : 'Pure, chemical-free organic groceries, heirloom seeds, wholesome plants, and natural wellness essentials.'}
              </p>
            </div>

            {/* Mobile Filter Button & Desktop Sort */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 shadow-xs"
              >
                <Filter className="w-4 h-4 text-primary" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="text-xs font-semibold text-gray-800 bg-transparent outline-none cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="name-asc">Product Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-serif font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <span>Categories</span>
                  <span className="text-xs text-primary font-sans font-normal">
                    {CATEGORIES.length} collections
                  </span>
                </h4>
                <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between ${selectedCategory === 'all'
                        ? 'bg-emerald-50 text-primary font-bold'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <span>All Products</span>
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between ${selectedCategory === cat.slug
                          ? 'bg-emerald-50 text-primary font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] text-gray-400 ml-1">({cat.itemCount})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="font-serif font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100 flex justify-between items-center">
                  <span>Max Price</span>
                  <span className="text-xs font-bold text-primary font-sans">
                    ₹{priceRange}
                  </span>
                </h4>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>₹100</span>
                  <span>₹2,500</span>
                </div>
              </div>

              {/* Cash On Delivery Assurance Notice */}
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <span>🚚 100% Cash on Delivery</span>
                </span>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  No online payment card needed. Pay easily with cash at your doorstep when items arrive.
                </p>
              </div>
            </div>
          </aside>

          {/* Product Listing Main Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-white rounded-2xl animate-pulse border border-gray-100" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-gray-500 text-sm">
                  No products found matching your current filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange(2500);
                  }}
                  className="mt-4 px-5 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-hover shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    {[...Array(pagination.totalPages)].map((_, idx) => {
                      const pNum = idx + 1;
                      return (
                        <button
                          key={pNum}
                          onClick={() => handlePageChange(pNum)}
                          className={`w-9 h-9 rounded-lg text-xs font-bold transition ${pagination.page === pNum
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          {pNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden flex justify-end">
          <div className="w-4/5 max-w-sm h-full bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-serif font-bold text-gray-900 text-base">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Collections
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${selectedCategory === 'all'
                        ? 'bg-emerald-50 text-primary font-bold'
                        : 'text-gray-700'
                      }`}
                  >
                    All Products
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${selectedCategory === cat.slug
                          ? 'bg-emerald-50 text-primary font-bold'
                          : 'text-gray-700'
                        }`}
                    >
                      {cat.name} ({cat.itemCount})
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-primary">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

