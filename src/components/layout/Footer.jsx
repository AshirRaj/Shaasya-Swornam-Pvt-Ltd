import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-gray-800">
          <div className="flex items-center space-x-4 bg-gray-800/40 p-4 rounded-xl border border-gray-800">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-primary flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Delivery</h4>
              <p className="text-xs text-gray-400 mt-0.5">On all orders above ₹500</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-800/40 p-4 rounded-xl border border-gray-800">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-primary flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Cash on Delivery</h4>
              <p className="text-xs text-gray-400 mt-0.5">100% Secure doorstep payment</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-800/40 p-4 rounded-xl border border-gray-800">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-primary flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Easy Returns</h4>
              <p className="text-xs text-gray-400 mt-0.5">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-800/40 p-4 rounded-xl border border-gray-800">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-primary flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">100% Organic</h4>
              <p className="text-xs text-gray-400 mt-0.5">Pesticide-free certified produce</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/img/Swarna-logo.png"
                alt="Shaasya Swornam"
                className="h-16 w-auto brightness-110 drop-shadow-md"
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              We’re not just a plant shop or organic store—we’re a passionate community dedicated to sustainable agriculture, pesticide-free pure nourishment, and green living.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/shaasyaswornamprivatelimited/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-serif tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition">Hydroponic Services</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition">All Products</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary transition">All Categories</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-serif tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/track-order" className="hover:text-primary transition font-medium text-emerald-400">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/returns-cancellations" className="hover:text-primary transition">
                  Return & Cancellation
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-primary transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-primary transition">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-primary transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-primary transition">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Address & Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-serif tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Plot HIG-12, Shailashree Vihar, Chandrasekharpur, Bhubaneswar, Odisha 751021</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+91 9348354248</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>shaasyaswornam@gmail.com</span>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-md text-[11px] font-medium">
                  Payment Method: Cash on Delivery Only
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Shaasya Swornam Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-conditions" className="hover:text-gray-400">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

