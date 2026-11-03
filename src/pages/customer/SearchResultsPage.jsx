import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, X } from 'lucide-react';
import { productService } from '../../services/productService';
import ProductCard from '../../components/products/ProductCard';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(query);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInputVal(query);
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await productService.getProducts({ search: query, limit: 30 });
      setProducts(res.data || []);
    } catch (err) {
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/products" className="hover:text-primary transition">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Search: "{query}"</span>
        </nav>

        {/* Search Header & Search Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 flex items-center space-x-3">
              <Search className="w-7 h-7 text-primary" />
              <span>Search Results for "{query}"</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Found {products.length} {products.length === 1 ? 'item' : 'items'} matching your search query.
            </p>
          </div>

          {/* Quick Refine Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-96">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search again..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => setInputVal('')}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold rounded-xl transition cursor-pointer shadow-xs flex-shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-72 bg-white rounded-2xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-800">
              No matching organic products found
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We couldn't find any products matching "{query}". Try checking your spelling or browsing our full collection.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-block px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover shadow-md transition"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
