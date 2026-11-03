import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, X, AlertCircle } from 'lucide-react';
import { returnService } from '../../services/returnService';
import { formatPrice, formatDate } from '../../utils/formatters';

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    setLoading(true);
    try {
      const res = await returnService.getAllReturns();
      setReturns(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, productId, newStatus, refundStatus) => {
    setActionLoading(true);
    try {
      await returnService.updateReturnStatus(orderId, productId, newStatus, refundStatus);
      fetchReturns();
    } catch (err) {
      alert(err.message || 'Error updating return request');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Returns & Refund Authorizations
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Review individual item return requests submitted by guest customers.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400">Loading return requests...</div>
        ) : returns.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400">
            No pending return or replacement requests at this time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">Return Reference</th>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Item Returned</th>
                  <th className="py-3.5 px-6">Reason Given</th>
                  <th className="py-3.5 px-6">Return Status</th>
                  <th className="py-3.5 px-6">Refund State</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {returns.map((ret, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-6 font-mono font-bold text-gray-900">{ret.returnId}</td>
                    <td className="py-3.5 px-6 font-mono text-gray-700">{ret.orderId}</td>
                    <td className="py-3.5 px-6">
                      <span className="font-semibold text-gray-900 block">{ret.customer?.fullName}</span>
                      <span className="text-[11px] text-gray-400">{ret.customer?.mobile}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-bold text-gray-900 block">{ret.item?.title}</span>
                      <span className="text-[11px] text-gray-400">{ret.item?.variant} • {formatPrice(ret.item?.price)}</span>
                    </td>
                    <td className="py-3.5 px-6 max-w-xs text-gray-600">
                      <span className="font-medium">{ret.reason}</span>
                      {ret.comments && <p className="text-[11px] text-gray-400 italic mt-0.5">"{ret.comments}"</p>}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          ret.returnStatus === 'Approved'
                            ? 'bg-emerald-100 text-primary'
                            : ret.returnStatus === 'Rejected'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ret.returnStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-gray-600 font-semibold">
                      {ret.refundStatus}
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      {ret.returnStatus === 'Pending' ? (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                ret.orderId,
                                ret.item?.productId,
                                'Approved',
                                'Refund Initiated'
                              )
                            }
                            disabled={actionLoading}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                ret.orderId,
                                ret.item?.productId,
                                'Rejected',
                                'No Refund'
                              )
                            }
                            disabled={actionLoading}
                            className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-[11px]">Processed</span>
                      )}
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

