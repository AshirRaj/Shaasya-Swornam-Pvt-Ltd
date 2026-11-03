import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Contact Us</span>
        </nav>

        <div className="max-w-xl">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Reach Out To Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-1">
            We’d Love to Hear From You
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
            Whether you have questions about our organic produce, nursery plants, hydroponic turnkey solutions, or order status, our friendly farm team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Direct Contact Info matching original green block */}
          <div className="bg-[#2e7d32] text-white p-8 sm:p-10 rounded-3xl shadow-lg flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-xl text-white pb-3 border-b border-green-700">
                Contact Information
              </h3>

              <div className="space-y-5 text-xs text-green-100">
                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block text-sm">Call Us Directly</span>
                    <a href="tel:+919348354248" className="hover:text-white transition">
                      +91 9348354248
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block text-sm">Email Address</span>
                    <a href="mailto:shaasyaswornam@gmail.com" className="hover:text-white transition">
                      shaasyaswornam@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block text-sm">Office & Nursery</span>
                    <p className="leading-relaxed">
                      Plot HIG-12, Shailashree Vihar, Chandrasekharpur, Bhubaneswar, Odisha 751021
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block text-sm">Customer Support Hours</span>
                    <p>Mon - Sat: 9:00 AM - 7:00 PM (IST)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-green-700/80 text-xs text-green-200">
              <p>For urgent inquiries or bulk farm orders, feel free to use our floating WhatsApp support button on the bottom right.</p>
            </div>
          </div>

          {/* Right 2 Columns: Inquiry Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-gray-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                  Thank you for reaching out. A representative from Shaasya Swornam will review your note and contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover shadow-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Subhashree Das"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hydroponics setup / Product inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Describe your inquiry or requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-2"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

