import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Banknote,
  ChevronRight,
  ArrowRight,
  Lock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { orderService } from '../../services/orderService';
import { validateCheckoutForm } from '../../utils/validators';
import { formatPrice } from '../../utils/formatters';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totals, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751024',
    landmark: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-serif font-bold text-gray-900">Your bag is empty</h2>
        <p className="text-xs text-gray-500 mt-1 mb-6">Add items to proceed to checkout.</p>
        <Link
          to="/products"
          className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validation = validateCheckoutForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to the first error
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          fullName: formData.fullName.trim(),
          mobile: formData.mobile.trim(),
          email: formData.email.trim() || undefined,
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          landmark: formData.landmark.trim() || undefined
        },
        items: items.map((i) => ({
          productId: i.productId,
          title: i.title,
          variant: i.variant,
          price: i.price,
          quantity: i.quantity,
          image: i.image
        })),
        subtotal: totals.subtotal,
        discount: totals.discount,
        shippingFee: totals.shippingFee,
        total: totals.total,
        paymentMethod: 'Cash on Delivery'
      };

      const response = await orderService.createOrder(orderPayload);

      if (response.success && response.data) {
        clearCart();
        // Redirect to Order Confirmation with state
        navigate(`/order-confirmation/${response.data.id}`, {
          state: { order: response.data }
        });
      } else {
        throw new Error(response.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setApiError(err.message || 'Order could not be submitted. Please check your network and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/cart" className="hover:text-primary transition">Cart</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Cash on Delivery Checkout</span>
        </nav>

        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
            Guest Checkout (Cash on Delivery)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            No registration or online payments needed. Enter your shipping address below.
          </p>
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleOrderSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Customer & Shipping Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-serif font-bold text-gray-900 text-lg flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <span>1. Delivery Address</span>
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">Step 1 of 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Priyadarshini Mohanty"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-primary outline-none transition ${
                        errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-semibold text-gray-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        maxLength="10"
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-primary outline-none transition ${
                          errors.mobile ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.mobile}</p>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Email Address <span className="text-gray-400 font-normal">(Optional for updates)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-primary outline-none transition ${
                        errors.email ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Flat / House No., Apartment, Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      rows="2"
                      placeholder="e.g. Plot No. HIG-12, Sector 2, Shailashree Vihar"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-primary outline-none transition ${
                        errors.address ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Landmark (Optional) */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Landmark <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="e.g. Near Big Bazaar / Temple"
                      value={formData.landmark}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none transition"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-primary outline-none transition ${
                        errors.city ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-primary outline-none transition ${
                        errors.state ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                    {errors.state && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.state}</p>
                    )}
                  </div>

                  {/* PIN Code */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength="6"
                      placeholder="6-digit PIN code"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-primary outline-none transition ${
                        errors.pincode ? 'border-red-400 bg-red-50/30' : 'border-gray-200'
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Section: Cash on Delivery Only */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-serif font-bold text-gray-900 text-lg flex items-center space-x-2">
                    <Banknote className="w-5 h-5 text-primary" />
                    <span>2. Payment Method</span>
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">Step 2 of 2</span>
                </div>

                <div className="border-2 border-primary bg-emerald-50/40 p-4 sm:p-5 rounded-2xl flex items-start space-x-3.5">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="accent-primary w-4 h-4 mt-0.5"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] bg-primary text-white font-semibold px-2 py-0.5 rounded-full">
                        Guaranteed
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Pay easily in cash at the time of delivery at your doorstep. No prepayment or credit card risk.
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 flex items-center space-x-1.5 pt-1">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Online payment gateways are disabled. We adhere to 100% Cash on Delivery fulfillment.</span>
                </div>
              </div>
            </div>

            {/* Right Col: Order Review & Submit */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                <h3 className="font-serif font-bold text-gray-900 text-base pb-3 border-b border-gray-100">
                  Order Review ({items.length} items)
                </h3>

                {/* Items Mini List */}
                <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 pr-1">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-contain rounded-md bg-gray-50 border border-gray-100 p-0.5 flex-shrink-0"
                        />
                        <div className="truncate">
                          <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                          <p className="text-[11px] text-gray-400">
                            {item.variant} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-800 flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">{formatPrice(totals.subtotal)}</span>
                  </div>

                  {totals.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount</span>
                      <span>-{formatPrice(totals.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span>
                      {totals.shippingFee === 0 ? (
                        <span className="text-primary font-bold">FREE</span>
                      ) : (
                        formatPrice(totals.shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total (Pay on Delivery)</span>
                    <span className="text-primary text-xl font-serif">
                      {formatPrice(totals.total)}
                    </span>
                  </div>
                </div>

                {/* Clear Place Order Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>Place Order with Cash on Delivery</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-[11px] text-gray-500 text-center leading-relaxed">
                  By clicking "Place Order", you confirm that you will pay <strong className="text-gray-800">{formatPrice(totals.total)}</strong> in cash upon doorstep delivery.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

