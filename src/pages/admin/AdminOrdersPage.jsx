import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  MapPin,
  Banknote,
  X
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { formatPrice, formatDate } from '../../utils/formatters';

const STATUS_LIST = [
  'all',
  'Order Placed',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

export default function AdminOrdersPage() {
  const [searchParams] = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail & Manage Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusNotes, setStatusNotes] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await adminService.getOrders({
        status: statusFilter,
        search
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedOrder) return;
    setStatusUpdating(true);
    try {
      const res = await adminService.updateOrderStatus(selectedOrder.id, newStatus, statusNotes);
      setSelectedOrder(res.data);
      setStatusNotes('');
      fetchOrders();
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleTogglePaymentStatus = async () => {
    if (!selectedOrder) return;
    const nextStatus = selectedOrder.paymentStatus === 'Collected' ? 'Pending' : 'Collected';
    try {
      const res = await adminService.updatePaymentStatus(selectedOrder.id, nextStatus);
      setSelectedOrder(res.data);
      fetchOrders();
    } catch (err) {
      alert(err.message || 'Failed to update payment status');
    }
  };

  // Helper to generate WhatsApp URL for a customer
  const getCustomerWhatsAppUrl = (order) => {
    if (!order || !order.customer?.mobile) return '#';
    const cleanMobile = String(order.customer.mobile).replace(/\D/g, '').slice(-10);
    const msg = encodeURIComponent(
      `Hello ${order.customer?.fullName || 'Customer'}, greetings from Shaasya Swornam Pvt. Ltd.! Regarding your Cash on Delivery Order #${order.id} (Total: ₹${order.total})...`
    );
    return `https://wa.me/91${cleanMobile}?text=${msg}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Order Management & Fulfillment
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            View orders, dispatch packages, contact customers via WhatsApp, and track COD collections.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search order ID, mobile, name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </form>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {STATUS_LIST.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st === 'all' ? 'All Orders' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400">
            No orders found matching the filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Customer Details</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">COD Status</th>
                  <th className="py-3.5 px-6">Delivery Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-4 px-6 font-mono font-bold text-gray-900">
                      {o.id}
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="block font-semibold text-gray-900">{o.customer?.fullName}</span>
                      <span className="text-[11px] text-gray-400">
                        +91 {o.customer?.mobile} • {o.customer?.city}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {formatPrice(o.total)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
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
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
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
                    <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                      {/* WhatsApp Button for each order */}
                      <a
                        href={getCustomerWhatsAppUrl(o)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-emerald-50 hover:bg-[#25D366] text-[#25D366] hover:text-white rounded-lg transition inline-flex items-center justify-center shadow-xs"
                        title="Chat with Customer on WhatsApp"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>

                      {/* Detail View Button */}
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-1.5 bg-gray-100 hover:bg-emerald-50 hover:text-primary rounded-lg text-gray-600 transition inline-flex items-center justify-center"
                        title="View & Manage Order"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Order Management
                </span>
                <h3 className="font-serif font-bold text-xl text-gray-900 font-mono">
                  {selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Status Update Control */}
              <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800 text-sm">
                    Current Status: <strong className="text-primary">{selectedOrder.orderStatus}</strong>
                  </span>
                  <button
                    onClick={handleTogglePaymentStatus}
                    className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-lg font-bold hover:bg-gray-50"
                  >
                    COD: {selectedOrder.paymentStatus} (Click to toggle)
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'Order Placed',
                    'Confirmed',
                    'Processing',
                    'Shipped',
                    'Out for Delivery',
                    'Delivered',
                    'Cancelled'
                  ].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(st)}
                      disabled={statusUpdating || selectedOrder.orderStatus === st}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        selectedOrder.orderStatus === st
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-white border border-gray-200 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Optional tracking note / dispatch remark..."
                    value={statusNotes}
                    onChange={(e) => setStatusNotes(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Customer & Address Details + WhatsApp Action Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                  <span className="font-bold text-gray-900 block text-xs">Customer Details</span>
                  <p className="font-semibold text-gray-800">{selectedOrder.customer?.fullName}</p>
                  <p>Mobile: +91 {selectedOrder.customer?.mobile}</p>
                  {selectedOrder.customer?.email && <p>Email: {selectedOrder.customer?.email}</p>}

                  {/* Direct WhatsApp Button in Customer Details */}
                  <div className="pt-2">
                    <a
                      href={getCustomerWhatsAppUrl(selectedOrder)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-xs shadow-xs transition"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>Message Customer on WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl space-y-1">
                  <span className="font-bold text-gray-900 block text-xs">Delivery Address</span>
                  <p>{selectedOrder.customer?.address}</p>
                  {selectedOrder.customer?.landmark && <p>Landmark: {selectedOrder.customer?.landmark}</p>}
                  <p>{selectedOrder.customer?.city}, {selectedOrder.customer?.state} - {selectedOrder.customer?.pincode}</p>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="space-y-2">
                <span className="font-bold text-gray-900 block text-xs">
                  Ordered Items ({selectedOrder.items?.length})
                </span>
                <div className="border border-gray-100 rounded-2xl divide-y divide-gray-100 overflow-hidden">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 object-contain rounded-md bg-gray-50 border border-gray-100 p-0.5"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-[11px] text-gray-400">{item.variant} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="bg-gray-50 p-4 rounded-2xl space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span>-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'FREE' : formatPrice(selectedOrder.shippingFee)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Payable:</span>
                  <span className="text-primary text-base">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
