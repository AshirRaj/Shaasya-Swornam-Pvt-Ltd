import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export default function CategoriesPage() {
  const collections = CATEGORIES.filter((c) => c.group === 'Collection');
  const organicItems = CATEGORIES.filter((c) => c.group === 'Organic Items');

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div>
          <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-primary font-semibold">Collections & Categories</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Browse All Categories
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            Discover our entire range of natural living products—from medicinal plants and organic heirloom seeds to pure unpolished groceries.
          </p>
        </div>

        {/* Section 1: Plants, Seeds, Soil & Planters */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-gray-800">
              Nursery & Garden Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-card-hover hover:border-emerald-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-50 mb-4 border border-gray-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/img/Swarna-logo.png';
                      }}
                    />
                  </div>
                  <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-primary transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{cat.itemCount} Products</span>
                  <div className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Organic Food & Groceries */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
            <Sparkles className="w-5 h-5 text-secondary" />
            <h2 className="text-xl font-serif font-bold text-gray-800">
              Organic Produce & Pantry Essentials
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {organicItems.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-card-hover hover:border-emerald-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-50 mb-4 border border-gray-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/img/Swarna-logo.png';
                      }}
                    />
                  </div>
                  <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-primary transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{cat.itemCount} Products</span>
                  <div className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

