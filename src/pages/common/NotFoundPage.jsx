import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-gray-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm text-center space-y-5">
        <div className="w-20 h-20 bg-emerald-50 text-primary rounded-full flex items-center justify-center mx-auto">
          <Sprout className="w-10 h-10" />
        </div>
        <span className="text-5xl font-serif font-bold text-gray-900 block">404</span>
        <h1 className="text-xl font-serif font-bold text-gray-800">
          Page Not Found
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed">
          The page you are looking for doesn't exist, has been removed, or was relocated.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-full shadow-md transition"
          >
            <span>Back to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

