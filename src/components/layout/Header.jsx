import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Mail,
  Package,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Header() {
  const navigate = useNavigate();
  const { totals, openCart } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-2.5 xl:px-3.5 py-6 text-sm xl:text-[15px] font-medium transition-colors border-b-2 flex items-center whitespace-nowrap flex-shrink-0 ${
      isActive
        ? 'text-primary border-primary font-bold'
        : 'text-[#555555] border-transparent hover:text-primary hover:border-primary/40'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs transition-all duration-300">
      {/* 1. Top Bar (height 45px) */}
      <div className="bg-[rgba(0,128,0,0.85)] text-white text-xs h-[45px] px-4 hidden lg:flex items-center border-b border-black/10">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-nowrap">
          {/* Left details */}
          <div className="flex items-center space-x-6 text-white/95 flex-shrink-0 whitespace-nowrap">
            <span className="flex items-center space-x-1.5 font-normal">
              <MapPin className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span>Bhubaneswar</span>
            </span>
            <span className="flex items-center space-x-1.5 font-normal">
              <Mail className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span>shaasyaswornam@gmail.com</span>
            </span>
          </div>

          {/* Right details & Socials */}
          <div className="flex items-center space-x-4 xl:space-x-5 flex-shrink-0 whitespace-nowrap">
            <span className="text-[11px] font-medium text-white/90">Follow us:</span>
            <div className="flex items-center space-x-3 text-white">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition text-white"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/shaasyaswornamprivatelimited/"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>

            <span className="text-white/40">|</span>

            <Link
              to="/track-order"
              className="text-white hover:underline flex items-center space-x-1 font-medium text-xs"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar - Aligned in ONE SINGLE LINE on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24 flex-nowrap gap-2 sm:gap-4 lg:gap-6">
          {/* Brand: Mobile view ONLY keeps logo, desktop shows logo + styled company name */}
          <Link
            to="/"
            className="flex items-center space-x-3 group py-1 focus:outline-none flex-shrink-0"
            aria-label="Shaasya Swornam Home"
          >
            <img
              src="/img/Swarna-logo.png"
              alt="Shaasya Swornam Logo"
              className="h-16 sm:h-20 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
            />
            {/* Desktop Only Company Name (Hidden on Mobile view) */}
            <div className="hidden lg:flex flex-col justify-center flex-shrink-0 whitespace-nowrap">
              <span className="font-serif text-lg xl:text-xl font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors leading-tight">
                Shaasya Swornam
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#3CB815] mt-0.5 flex items-center gap-1.5">
                <span>Pvt. Ltd.</span>
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-500"></span>
                <span className="text-gray-400 font-medium normal-case tracking-normal">Pure Taste of Nature</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Single Line Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 h-full flex-shrink-0 flex-nowrap">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Service
            </NavLink>

            {/* Collection Dropdown */}
            <div
              className="relative h-full flex items-center flex-shrink-0"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                className="px-2.5 xl:px-3.5 py-6 text-sm xl:text-[15px] font-medium text-[#555555] hover:text-primary transition-colors flex items-center space-x-1 focus:outline-none cursor-pointer whitespace-nowrap flex-shrink-0"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              >
                <span>Collection</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-b-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in duration-200">
                  <Link
                    to="/category/plants"
                    className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-primary transition"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    Plants
                  </Link>
                  <Link
                    to="/category/seeds"
                    className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-primary transition"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    Seeds
                  </Link>
                  <Link
                    to="/category/soil-fertilizer"
                    className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-primary transition"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    Soil & Fertilizer
                  </Link>
                  <Link
                    to="/category/planters"
                    className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-primary transition"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    Planters
                  </Link>
                  <Link
                    to="/categories"
                    className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-primary transition border-t border-gray-50 mt-1 pt-2"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    Organic Items
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/products" className={navLinkClass}>
              All Products
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </nav>

          {/* Action Buttons - Aligned in One Line on Desktop */}
          <div className="flex items-center space-x-2 sm:space-x-3 xl:space-x-4 flex-shrink-0 flex-nowrap">
            {/* Search Input on Desktop with Clickable Search Submit Button */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center w-36 lg:w-44 xl:w-52 flex-shrink-0">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-full focus:bg-white focus:border-primary outline-none transition"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary hover:bg-primary-hover text-white rounded-full flex items-center justify-center transition cursor-pointer shadow-xs flex-shrink-0"
              >
                <Search className="w-3 h-3" />
              </button>
            </form>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`md:hidden p-2 rounded-full transition flex-shrink-0 cursor-pointer ${
                isSearchOpen ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`}
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-600 hover:text-primary rounded-full hover:bg-gray-100 transition flex-shrink-0"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-secondary rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-2 py-2 px-3 bg-emerald-50 text-primary hover:bg-primary hover:text-white rounded-full transition-colors flex-shrink-0 whitespace-nowrap cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline-block text-xs font-bold">
                {totals.itemCount}
              </span>
              {totals.itemCount > 0 && (
                <span className="sm:hidden absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-secondary rounded-full">
                  {totals.itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary rounded-lg focus:outline-none flex-shrink-0 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown with Clickable Submit Button */}
        {isSearchOpen && (
          <div className="md:hidden py-3 px-1 border-t border-gray-100 bg-white">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search plants, flours, spices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:bg-white outline-none"
                  autoFocus
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 flex-shrink-0 shadow-xs"
              >
                <span>Search</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <img src="/img/Swarna-logo.png" alt="Shaasya Swornam Logo" className="h-14 w-auto object-contain" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Search Form */}
              <div className="p-4 border-b border-gray-100 bg-white">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search store..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:bg-white outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg transition cursor-pointer flex-shrink-0"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="px-4 py-3 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/services"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Service
                </Link>
                <Link
                  to="/categories"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Collection
                </Link>
                <Link
                  to="/products"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-emerald-50 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <div className="border-t border-gray-100 my-2 pt-2">
                  <Link
                    to="/track-order"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package className="w-4 h-4 mr-2 text-primary" />
                    <span>Track Order</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
              <p>📍 Bhubaneswar, Odisha</p>
              <p>📞 +91 9348354248</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
