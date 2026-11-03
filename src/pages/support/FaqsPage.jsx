import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work on Shaasya Swornam?',
      a: 'We operate on a 100% Cash on Delivery payment model. You place your order by simply filling out your delivery address without having to enter any card or UPI details online. When our delivery courier reaches your door, you inspect your package and pay the exact invoice amount in cash.'
    },
    {
      q: 'Are your food products truly 100% organic and chemical-free?',
      a: 'Yes. All our products—from unpolished lentils and grains to wood-pressed cold-pressed oils—are grown and processed without synthetic chemical fertilizers, artificial coloring, or preservatives. We work closely with certified organic farmers who practice sustainable biological cultivation.'
    },
    {
      q: 'Do you charge for delivery?',
      a: 'Orders above ₹500 qualify for FREE doorstep delivery across our serviceable pincodes. For orders below ₹500, a standard nominal shipping charge of ₹49 applies.'
    },
    {
      q: 'How can I track my order status without an account?',
      a: 'Since we respect your privacy and do not require account registration, you can track any order anytime on our "Track Order" page using your Order ID (received upon placing the order) and your 10-digit mobile number.'
    },
    {
      q: 'Can I cancel or return an order?',
      a: 'Yes! You can cancel an order online directly from the Order Tracking page as long as it has not yet been shipped. If you receive a damaged or incorrect product, you can submit a return request for that specific item within 7 days of delivery.'
    },
    {
      q: 'Do you provide commercial hydroponics setups and training?',
      a: 'Yes! Shaasya Swornam Pvt. Ltd. designs, engineers, and installs turnkey hydroponic systems for commercial growers, indoor setups, and urban rooftop farms. We also conduct agronomy workshops and training programs.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">FAQs</span>
        </nav>

        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Got Questions?
          </span>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Find immediate answers about our organic sourcing, Cash on Delivery, delivery timelines, and customer service.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-serif font-bold text-gray-900 hover:text-primary transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    openIndex === idx ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center space-y-2">
          <h4 className="font-serif font-bold text-gray-900 text-sm">
            Have a question that is not covered here?
          </h4>
          <p className="text-xs text-gray-600">
            Reach out directly to our customer care team at <a href="tel:+919348354248" className="font-bold text-primary underline">+91 9348354248</a> or via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

