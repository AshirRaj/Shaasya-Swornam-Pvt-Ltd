import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  DollarSign,
  RotateCcw,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected Route Check
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Discounts & Coupons', path: '/admin/coupons', icon: Tag },
    { label: 'COD Payments', path: '/admin/payments', icon: DollarSign },
    { label: 'Returns & Refunds', path: '/admin/returns', icon: RotateCcw },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-gray-900 text-gray-300 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2.5">
              <img
                src="/img/Swarna-logo.png"
                alt="Logo"
                className="h-9 w-auto brightness-110"
              />
              <div>
                <span className="font-serif font-bold text-white text-sm block">Shaasya Admin</span>
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                  Spring Boot Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white font-bold shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-950/50 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs text-gray-400 hover:text-primary transition rounded-lg hover:bg-gray-800"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Customer Store</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base font-semibold text-gray-800 font-serif">
              Store Administration Console
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-primary flex items-center justify-center font-bold text-xs">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-semibold text-gray-900 block leading-tight">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">
                  {user?.role || 'Admin'} • Authenticated
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

