import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import WhatsAppButton from '../components/common/WhatsAppButton';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />

      {/* Floating Track Order Button for Mobile */}
      <Link
        to="/track-order"
        className="md:hidden fixed bottom-6 left-4 z-40 bg-white/95 hover:bg-white text-gray-800 hover:text-primary px-3.5 py-2.5 rounded-full shadow-lg border border-gray-200/90 backdrop-blur-xs flex items-center space-x-1.5 text-xs font-bold transition-all active:scale-95 cursor-pointer"
        aria-label="Track Order"
      >
        <Package className="w-4 h-4 text-primary flex-shrink-0" />
        <span className="tracking-tight">Track Order</span>
      </Link>
    </div>
  );
}
