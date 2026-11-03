import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ChevronRight } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Return & Refund Policy</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs text-gray-600 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 pb-4 border-b border-gray-100 flex items-center space-x-3">
            <RotateCcw className="w-7 h-7 text-primary" />
            <span>Return, Replacement & Refund Policy</span>
          </h1>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">1. Eligibility for Returns</h2>
            <p>
              We accept return and replacement requests within <strong>7 days</strong> of delivery for packaged organic goods (dals, flours, spices, oils, seeds, planters) in cases where:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The outer package or container arrived damaged or broken.</li>
              <li>An incorrect product variant was dispatched.</li>
              <li>The safety seal was compromised upon arrival.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">2. Individual Item Returns</h2>
            <p>
              Customers with multi-item orders are not required to return the entire package. You can log a return request for a single item directly through our guest portal, and the backend will calculate the correct adjusted total.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">3. Cash on Delivery Refunds</h2>
            <p>
              Because orders are fulfilled via Cash on Delivery, refunds for verified returned items are credited via direct bank account transfer (NEFT / IMPS / UPI) within 3 to 5 business days after product inspection by our warehouse team.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">4. Cancellation Window</h2>
            <p>
              Orders can be cancelled free of charge at any time prior to shipment dispatch. Once marked as "Shipped", cancellation is not permitted and customers must request a return upon delivery.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

