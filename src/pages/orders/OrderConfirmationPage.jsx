import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Banknote, Clock, ArrowRight, Printer, Share2 } from 'lucide-react';
import { orderService } from '../../services/orderService';
import { formatPrice, formatDate } from '../../utils/formatters';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const location = useLocation();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!order && orderId) {
      orderService
        .getOrderById(orderId)
        .then((res) => setOrder(res.data))
        .catch((err) => setError(err.message || 'Could not load order details'))
        .finally(() => setLoading(false));
    }
  }, [orderId, order]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-gray-500">Retrieving your order confirmation...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-gray-800">Order Not Found</h2>
        <p className="text-xs text-gray-500">{error || 'Unable to locate order information.'}</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full shadow-md"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Celebration Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-100 text-primary rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
          </div>

          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mt-2 leading-relaxed">
              We have received your order. Our farm team is packaging your fresh organic products with care.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
            <span className="text-xs text-gray-600 font-medium">Order Reference:</span>
            <span className="text-xs font-mono font-bold text-primary">{order.id}</span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
            <div>
              <span className="text-xs text-gray-400">Order Date:</span>
              <p className="text-xs font-semibold text-gray-800">{formatDate(order.createdAt)}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-gray-400">Payment Method:</span>
              <p className="text-xs font-bold text-emerald-700 flex items-center sm:justify-end space-x-1">
                <Banknote className="w-3.5 h-3.5" />
                <span>Cash on Delivery (COD)</span>
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Delivery Details</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-2xl text-xs text-gray-700 space-y-1">
              <p className="font-bold text-gray-900">{order.customer?.fullName}</p>
              <p>Phone: +91 {order.customer?.mobile}</p>
              {order.customer?.email && <p>Email: {order.customer?.email}</p>}
              <p>{order.customer?.address}</p>
              {order.customer?.landmark && <p>Landmark: {order.customer?.landmark}</p>}
              <p>
                {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
              </p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center space-x-2">
              <Package className="w-4 h-4 text-primary" />
              <span>Items in this Order ({order.items?.length})</span>
            </h3>

            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {order.items?.map((item, idx) => (
                <div key={idx} className="p-3 sm:p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain rounded-lg bg-gray-50 border border-gray-100 p-0.5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-[11px] text-gray-400">
                        {item.variant} • Qty: {item.quantity}
                      </p>
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
          <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount Applied</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>{order.shippingFee === 0 ? <strong className="text-primary">FREE</strong> : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between items-center text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
              <span>Cash Amount to Pay on Delivery</span>
              <span className="text-primary text-xl font-serif">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              to={`/track-order?orderId=${order.id}&mobile=${order.customer?.mobile || ''}`}
              className="flex-1 py-3 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Track Live Delivery Status</span>
            </Link>

            <Link
              to="/products"
              className="py-3 px-6 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

