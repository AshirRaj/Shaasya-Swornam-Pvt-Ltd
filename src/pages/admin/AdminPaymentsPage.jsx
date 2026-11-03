import React, { useState, useEffect } from 'react';
import { DollarSign, Banknote, ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { formatPrice, formatDate } from '../../utils/formatters';

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await adminService.getOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePaymentStatus = async (orderId, currentStatus) => {
    const next = currentStatus === 'Collected' ? 'Pending' : 'Collected';
    try {
      await adminService.updatePaymentStatus(orderId, next);
      fetchPayments();
    } catch (err) {
      alert(err.message || 'Error updating payment status');
    }
  };

  const collectedTotal = orders
    .filter((o) => o.paymentStatus === 'Collected')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingTotal = orders
    .filter((o) => o.paymentStatus === 'Pending' && o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Cash on Delivery (COD) Payments & Reconciliation
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Track cash collected by courier delivery executives and pending COD settlements.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-gray-500 block">Total Cash Collected</span>
            <span className="text-2xl font-serif font-bold text-primary mt-1 block">
              {formatPrice(collectedTotal)}
            </span>
            <span className="text-[11px] text-gray-400">Delivered & verified in cash</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-primary rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-gray-500 block">Pending COD In Transit</span>
            <span className="text-2xl font-serif font-bold text-amber-600 mt-1 block">
              {formatPrice(pendingTotal)}
            </span>
            <span className="text-[11px] text-gray-400">To be collected upon doorstep delivery</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-gray-500 block">Supported Payment Method</span>
            <span className="text-lg font-bold text-gray-900 mt-1 block">
              Cash on Delivery Only
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">100% Secure & Compliant</span>
          </div>
          <div className="w-12 h-12 bg-gray-50 text-gray-700 rounded-xl flex items-center justify-center">
            <Banknote className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400">Loading payment ledger...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Order Date</th>
                  <th className="py-3.5 px-6">COD Payable</th>
                  <th className="py-3.5 px-6">Delivery State</th>
                  <th className="py-3.5 px-6">Collection Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-6 font-mono font-bold text-gray-900">{o.id}</td>
                    <td className="py-3.5 px-6 font-semibold text-gray-800">{o.customer?.fullName}</td>
                    <td className="py-3.5 px-6 text-gray-500">{formatDate(o.createdAt)}</td>
                    <td className="py-3.5 px-6 font-bold text-gray-900">{formatPrice(o.total)}</td>
                    <td className="py-3.5 px-6 text-gray-600">{o.orderStatus}</td>
                    <td className="py-3.5 px-6">
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
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => handleUpdatePaymentStatus(o.id, o.paymentStatus)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
                      >
                        Mark as {o.paymentStatus === 'Collected' ? 'Pending' : 'Collected'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

