import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // 1. Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // 2. Mobile Phone validation
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!cleanedPhone) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
    }

    // 3. Email validation (optional, but validate format if provided)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // 4. Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    // 5. Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters describing your inquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    const whatsappMessage = `🌿 *New Inquiry from Shaasya Swornam Website*

*Name:* ${formData.name.trim()}
*Mobile:* ${cleanedPhone}
*Email:* ${formData.email.trim() || 'Not specified'}
*Subject:* ${formData.subject.trim()}

*Message:*
${formData.message.trim()}

------------------------------
_Sent via Shaasya Swornam Contact Portal_`;

    const targetNumber = '919348354248';
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    setLastWhatsappUrl(whatsappUrl);

    // Short timeout to provide smooth UI feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Redirect / open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
            Whether you have questions about our organic produce, nursery plants, hydroponic turnkey solutions, or order status, our friendly farm team is here to assist you directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Direct Contact Info */}
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
              <p>For urgent inquiries or bulk farm orders, submitting this form opens a direct chat with our experts on WhatsApp (+91 9348354248).</p>
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
                  Opening WhatsApp Chat...
                </h3>
                <p className="text-xs text-gray-600 max-w-md leading-relaxed">
                  Your inquiry message has been compiled and redirected to our official farm WhatsApp number (<strong>+91 9348354248</strong>).
                </p>

                {lastWhatsappUrl && (
                  <div className="pt-2">
                    <a
                      href={lastWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-full shadow-md transition"
                    >
                      <span>Continue to WhatsApp Chat</span>
                    </a>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                    setErrors({});
                  }}
                  className="mt-4 px-6 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-full hover:bg-gray-50 transition cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-gray-900 mb-1">
                    Send Us a Message on WhatsApp
                  </h3>
                  <p className="text-xs text-gray-500">
                    Fill out the form below. Once you click "Send to WhatsApp", your details and message will open directly in a WhatsApp conversation with our team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Subhashree Das"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl outline-none transition ${
                        errors.name
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                          : 'border-gray-200 focus:bg-white focus:border-primary'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile (e.g. 9876543210)"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl outline-none transition ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                          : 'border-gray-200 focus:bg-white focus:border-primary'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl outline-none transition ${
                        errors.email
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                          : 'border-gray-200 focus:bg-white focus:border-primary'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Organic Produce / Nursery Inquiry"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl outline-none transition ${
                        errors.subject
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                          : 'border-gray-200 focus:bg-white focus:border-primary'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Describe your inquiry or requirement (minimum 10 characters)..."
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl outline-none transition ${
                      errors.message
                        ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                        : 'border-gray-200 focus:bg-white focus:border-primary'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                  >
                    {loading ? (
                      <span>Redirecting to WhatsApp...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send to WhatsApp (+91 9348354248)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
