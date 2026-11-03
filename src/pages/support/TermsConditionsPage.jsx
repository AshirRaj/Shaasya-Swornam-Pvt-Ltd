import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';

export default function TermsConditionsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Terms & Conditions</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs text-gray-600 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 pb-4 border-b border-gray-100 flex items-center space-x-3">
            <FileText className="w-7 h-7 text-primary" />
            <span>Terms and Conditions</span>
          </h1>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">1. Introduction</h2>
            <p>
              These Terms and Conditions govern the use of the website and services offered by Shaasya Swornam Pvt. Ltd., headquartered in Bhubaneswar, Odisha. By ordering from our platform, you accept these terms in full.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">2. Cash on Delivery Obligation</h2>
            <p>
              By placing an order via Cash on Delivery, the customer enters into an agreement to receive the package and tender the exact invoiced cash amount upon delivery. Deliberate non-acceptance of validly dispatched orders may result in address blacklisting for future orders.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">3. Product Descriptions & Availability</h2>
            <p>
              We endeavor to accurately display weights, descriptions, and imagery of our organic produce. However, naturally cultivated organic vegetables, live plants, and grains may exhibit natural seasonal variations in size, color, and aroma.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-sm text-gray-900">4. Limitation of Liability & Jurisdiction</h2>
            <p>
              All disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in Bhubaneswar, Odisha.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

