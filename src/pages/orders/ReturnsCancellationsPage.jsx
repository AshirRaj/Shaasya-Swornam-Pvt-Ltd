import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, XCircle, ShieldCheck, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';

export default function ReturnsCancellationsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Returns & Cancellations</span>
        </nav>

        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Returns, Replacements & Order Cancellation
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
            At Shaasya Swornam Pvt. Ltd., customer satisfaction and pure organic quality are our highest priorities. We provide clear, fair guidelines for cancelling orders or returning items.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-primary rounded-2xl flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900">
              Return an Individual Product
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Delivered orders can be returned within 7 days if damaged or defective. You can request a return for a single product without affecting the other items in your order.
            </p>
            <Link
              to="/track-order"
              className="inline-flex items-center space-x-2 text-xs font-bold text-primary hover:underline pt-2"
            >
              <span>Go to Order Tracking to Request Return</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900">
              Cancel a Pending Order
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Orders can be easily cancelled online anytime while their status is "Order Placed", "Confirmed", or "Processing" before final courier dispatch.
            </p>
            <Link
              to="/track-order"
              className="inline-flex items-center space-x-2 text-xs font-bold text-primary hover:underline pt-2"
            >
              <span>Cancel Order via Order Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Policy Details */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs text-gray-600 leading-relaxed">
          <h3 className="font-serif font-bold text-base text-gray-900">
            Important Return & Refund Guidelines
          </h3>

          <ul className="space-y-3 list-disc pl-5">
            <li>
              <strong>Item Condition:</strong> Returned items must be unused, in their original packaging, and with safety seals intact where applicable.
            </li>
            <li>
              <strong>Perishable Produce:</strong> Fresh farm harvest vegetables and leafy greens must be inspected upon delivery. Damaged greens should be reported within 24 hours of delivery.
            </li>
            <li>
              <strong>Cash on Delivery Refunds:</strong> For items returned after COD payment collection, refunds will be initiated to your verified bank account (NEFT/UPI) within 3-5 business days following backend verification.
            </li>
            <li>
              <strong>Partial Order Returns:</strong> If an order includes 3 items, you may return just 1 item. The backend updates remaining order balances accurately.
            </li>
          </ul>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-gray-500">Need personal assistance with your order?</span>
            <Link to="/contact" className="text-primary font-bold hover:underline">
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

