import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  RotateCcw,
  XCircle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { trackingService } from '../../services/trackingService';
import { orderService } from '../../services/orderService';
import { returnService } from '../../services/returnService';
import { formatPrice, formatDate } from '../../utils/formatters';

const TIMELINE_STEPS = [
  'Order Placed',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export default function OrderTrackingPage() {
  const [searchParams] = useSearchParams();

  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [mobile, setMobile] = useState(searchParams.get('mobile') || '');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cancel Modal State
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // Return Modal State
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedItemForReturn, setSelectedItemForReturn] = useState(null);
  const [returnReason, setReturnReason] = useState('Damaged or defective item');
  const [returnComments, setReturnComments] = useState('');

  useEffect(() => {
    if (orderId && mobile) {
      handleTrack();
    }
  }, []);

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!orderId.trim() || !mobile.trim()) {
      setError('Please provide both Order ID and your registered 10-digit mobile number.');
      return;
    }

    setError('');
    setActionMessage('');
    setLoading(true);

    try {
      const res = await trackingService.trackOrder(orderId.trim(), mobile.trim());
      setOrder(res.data);
    } catch (err) {
      setOrder(null);
      setError(err.message || 'No matching order found with the provided details.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    setActionLoading(true);
    setActionMessage('');
    try {
      const res = await orderService.cancelOrder(order.id, cancelReason);
      setOrder(res.data);
      setActionMessage('Your order has been cancelled successfully.');
      setCancelModalOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
    } finally {
      setActionLoading(false);
    }
  };

  const openReturnModal = (item) => {
    setSelectedItemForReturn(item);
    setReturnReason('Damaged or defective item');
    setReturnComments('');
    setReturnModalOpen(true);
  };

  const handleItemReturnSubmit = async (e) => {
    e.preventDefault();
    if (!order || !selectedItemForReturn) return;
    setActionLoading(true);
    try {
      const res = await returnService.requestItemReturn({
        orderId: order.id,
        productId: selectedItemForReturn.productId,
        variant: selectedItemForReturn.variant,
        reason: returnReason,
        comments: returnComments
      });
      setOrder(res.data);
      setActionMessage(res.message);
      setReturnModalOpen(false);
    } catch (err) {
      setError(err.message || 'Could not submit return request.');
    } finally {
      setActionLoading(false);
    }
  };

  const getStepStatus = (stepName) => {
    if (!order) return 'upcoming';
    if (order.orderStatus === 'Cancelled') return 'cancelled';

    const currentIndex = TIMELINE_STEPS.indexOf(order.orderStatus);
    const stepIndex = TIMELINE_STEPS.indexOf(stepName);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Track Order</span>
        </nav>

        {/* Title & Lookup Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 flex items-center space-x-3">
              <Package className="w-7 h-7 text-primary" />
              <span>Guest Order Tracking</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Enter your Order Reference ID and Mobile Number to track live status, request item returns, or cancel pending orders.
            </p>
          </div>

          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Order ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. ORD-849102"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none uppercase font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                maxLength="10"
                placeholder="10-digit number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                {loading ? (
                  <span>Checking...</span>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {actionMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-primary" />
              <span>{actionMessage}</span>
            </div>
          )}
        </div>

        {/* Order Details & Timeline Display */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-8">
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <span className="text-xs text-gray-400">Order Reference:</span>
                <h2 className="text-xl font-bold font-mono text-gray-900">{order.id}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Placed on {formatDate(order.createdAt)}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.orderStatus === 'Delivered'
                      ? 'bg-emerald-100 text-primary'
                      : order.orderStatus === 'Cancelled'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Status: {order.orderStatus}
                </span>

                {order.canCancel && (
                  <button
                    onClick={() => setCancelModalOpen(true)}
                    className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-semibold rounded-lg transition"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {/* Visual Timeline (Requirement 8) */}
            {order.orderStatus !== 'Cancelled' ? (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-gray-900 text-base">
                  Delivery Progress Timeline
                </h3>

                <div className="relative">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {TIMELINE_STEPS.map((step, idx) => {
                      const status = getStepStatus(step);
                      return (
                        <div
                          key={step}
                          className={`p-3 rounded-2xl border text-center transition ${
                            status === 'completed'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : status === 'current'
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-gray-50 border-gray-200 text-gray-400'
                          }`}
                        >
                          <div className="text-xs font-bold mb-1 flex items-center justify-center space-x-1">
                            {status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                            {status === 'current' && <Clock className="w-3.5 h-3.5 text-white animate-pulse" />}
                            <span>Step {idx + 1}</span>
                          </div>
                          <p className="text-xs font-semibold leading-tight">{step}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-xs text-red-700">
                This order was cancelled. No further delivery action will be taken.
              </div>
            )}

            {/* Tracking History Logs */}
            {order.tracking && order.tracking.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Tracking Activity Log
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {order.tracking.map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs flex justify-between items-start"
                    >
                      <div>
                        <span className="font-bold text-gray-800 mr-2">{t.status}:</span>
                        <span className="text-gray-600">{t.notes}</span>
                      </div>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap ml-4">
                        {formatDate(t.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ordered Items with Individual Return Option */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-gray-900 text-base">
                Items in Order ({order.items?.length})
              </h3>

              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-contain rounded-xl bg-gray-50 border border-gray-100 p-1"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-gray-900">{item.title}</h4>
                        <p className="text-xs text-gray-500">
                          {item.variant} • Qty: {item.quantity} • {formatPrice(item.price)}
                        </p>
                        {item.returnRequested && (
                          <div className="mt-1 flex items-center space-x-2 text-[11px]">
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                              Return: {item.returnStatus || 'Pending'}
                            </span>
                            <span className="text-gray-500">
                              Reason: {item.returnReason}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end sm:space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <span className="font-bold text-sm text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Return button if order delivered and item not yet returned */}
                      {order.orderStatus === 'Delivered' && !item.returnRequested && (
                        <button
                          onClick={() => openReturnModal(item)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
                        >
                          Request Item Return
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Delivery Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs text-gray-600">
              <div className="bg-gray-50 p-4 rounded-2xl space-y-1">
                <span className="font-bold text-gray-800 block text-sm">Delivery Address</span>
                <p className="font-semibold text-gray-900">{order.customer?.fullName}</p>
                <p>Phone: +91 {order.customer?.mobile}</p>
                <p>{order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                <span className="font-bold text-gray-800 block text-sm">Payment Details</span>
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-bold text-gray-900">Cash on Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className={`font-bold ${order.paymentStatus === 'Collected' ? 'text-primary' : 'text-amber-600'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200 text-sm font-bold text-gray-900">
                  <span>Payable Amount:</span>
                  <span className="text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Cancel Order {order?.id}?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Reason for Cancellation (Optional)
                </label>
                <textarea
                  rows="2"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Changed my mind, placed duplicate order..."
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-lg hover:bg-gray-50"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  {actionLoading ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Item Return Modal */}
        {returnModalOpen && selectedItemForReturn && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-xl">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Request Return for {selectedItemForReturn.title}
              </h3>
              <p className="text-xs text-gray-500">
                Return requests are processed individually without modifying the rest of your order.
              </p>

              <form onSubmit={handleItemReturnSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Reason for Return <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary font-medium"
                  >
                    <option value="Damaged or defective item">Damaged or defective item</option>
                    <option value="Wrong product received">Wrong product received</option>
                    <option value="Seal broken or expired">Seal broken or expired</option>
                    <option value="Quality not satisfactory">Quality not satisfactory</option>
                    <option value="Other reason">Other reason</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Additional Comments
                  </label>
                  <textarea
                    rows="3"
                    value={returnComments}
                    onChange={(e) => setReturnComments(e.target.value)}
                    placeholder="Please specify any details for our inspection team..."
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReturnModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    {actionLoading ? 'Submitting...' : 'Submit Return Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

