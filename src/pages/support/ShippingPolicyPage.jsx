import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ChevronRight } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Shipping Policy</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs text-gray-600 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 pb-4 border-b border-gray-100 flex items-center space-x-3">
            <Truck className="w-7 h-7 text-primary" />
            <span>Shipping & Delivery Policy</span>
          </h1>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">1. Order Processing Timeline</h2>
            <p>
              All orders placed on the Shaasya Swornam store are processed within 24 to 48 business hours. Fresh vegetables and live plants are harvested and carefully boxed with ventilated eco-friendly packaging to ensure maximum freshness during transit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">2. Shipping Charges</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Orders with a subtotal of <strong>₹500 or higher</strong> qualify for <strong>FREE Doorstep Delivery</strong>.</li>
              <li>Orders below ₹500 incur a flat shipping charge of <strong>₹49</strong>.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">3. Cash on Delivery (COD)</h2>
            <p>
              We exclusively provide Cash on Delivery (COD). No advance payment or card details are requested. Please ensure the exact cash amount is ready at the time of courier arrival.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">4. Estimated Delivery Days</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Local Bhubaneswar & Cuttack:</strong> 1-2 business days.</li>
              <li><strong>Rest of Odisha:</strong> 2-3 business days.</li>
              <li><strong>Pan-India:</strong> 4-6 business days depending on pincode serviceability.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">5. Order Tracking</h2>
            <p>
              You can track your package live using your Order ID and registered 10-digit mobile number on our <Link to="/track-order" className="text-primary font-bold underline">Order Tracking Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

