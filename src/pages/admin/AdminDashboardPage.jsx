import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  DollarSign,
  Users,
  Package,
  AlertTriangle,
  Clock,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { formatPrice, formatDate } from '../../utils/formatters';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await adminService.getDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching admin dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100" />
          ))}
        </div>
        <div className="h-80 bg-white rounded-2xl border border-gray-100" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Revenue (COD)',
      value: formatPrice(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: 'bg-emerald-50 text-primary border-emerald-100',
      change: 'Doorstep COD cash'
    },
    {
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      change: `${stats?.pendingOrders || 0} pending action`
    },
    {
      label: 'Unique Customers',
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      change: 'Guest checkout contacts'
    },
    {
      label: 'Active Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      change: `${stats?.lowStockProducts || 0} low stock alerts`
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Store Performance Overview
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time analytics for orders, Cash on Delivery collection, and farm inventory.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to="/admin/orders"
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            Manage All Orders
          </Link>
        </div>
      </div>

      {/* 4 Primary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-xs flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-medium text-gray-500 block mb-1">
                  {card.label}
                </span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-gray-900 block">
                  {card.value}
                </span>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  {card.change}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Alerts Row (Pending Orders & Low Stock) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-xs sm:text-sm">
                {stats?.pendingOrders} Pending Orders Need Attention
              </h4>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Orders waiting to be confirmed, packed, and dispatched.
              </p>
            </div>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition"
          >
            Review
          </Link>
        </div>

        <div className="bg-red-50/70 border border-red-200 p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-red-900 text-xs sm:text-sm">
                {stats?.lowStockProducts} Low Stock Inventory Alerts
              </h4>
              <p className="text-[11px] text-red-700 mt-0.5">
                Products with fewer than 10 units remaining in stock.
              </p>
            </div>
          </div>
          <Link
            to="/admin/inventory"
            className="text-xs font-bold text-red-900 bg-red-200/80 hover:bg-red-300 px-3 py-1.5 rounded-lg transition"
          >
            Restock
          </Link>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-gray-900 text-base">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Latest Cash on Delivery order submissions.
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-primary hover:underline flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Items</th>
                <th className="py-3.5 px-6">Total Amount</th>
                <th className="py-3.5 px-6">COD Status</th>
                <th className="py-3.5 px-6">Delivery Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {stats?.recentOrders?.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-4 px-6 font-mono font-bold text-gray-900">
                    {o.id}
                  </td>
                  <td className="py-4 px-6">
                    <span className="block font-semibold text-gray-900">{o.customer?.fullName}</span>
                    <span className="text-[11px] text-gray-400">{o.customer?.mobile} • {o.customer?.city}</span>
                  </td>
                  <td className="py-4 px-6">
                    {o.items?.length} {o.items?.length === 1 ? 'item' : 'items'}
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    {formatPrice(o.total)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        o.paymentStatus === 'Collected'
                          ? 'bg-emerald-100 text-primary'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        o.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-primary'
                          : o.orderStatus === 'Cancelled'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/admin/orders?search=${o.id}`}
                      className="text-primary hover:underline font-bold"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

