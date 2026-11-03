import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Privacy Policy</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs text-gray-600 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 pb-4 border-b border-gray-100 flex items-center space-x-3">
            <ShieldCheck className="w-7 h-7 text-primary" />
            <span>Privacy Policy</span>
          </h1>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">1. Information We Collect</h2>
            <p>
              Shaasya Swornam Pvt. Ltd. does not mandate customer registration or accounts. During checkout, we collect only the essential information needed to fulfill your Cash on Delivery order: your Full Name, Mobile Number, Delivery Address, and optional Email Address.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">2. No Financial Information Stored</h2>
            <p>
              Since we operate exclusively via Cash on Delivery, we never collect, store, or process your credit card numbers, debit card PINs, CVVs, or online banking credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">3. Use of Information</h2>
            <p>
              Your contact details are strictly used to coordinate parcel delivery, verify Cash on Delivery availability, and provide order status updates via SMS or WhatsApp. We never sell, rent, or lease your personal data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">4. Contact Grievance Officer</h2>
            <p>
              For any questions regarding your data privacy, write to us at <a href="mailto:shaasyaswornam@gmail.com" className="text-primary font-bold">shaasyaswornam@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

