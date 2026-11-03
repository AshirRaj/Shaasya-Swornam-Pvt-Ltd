import React, { useState, useEffect } from 'react';
import { Plus, Tag, Trash2, Edit2, X, CheckCircle2 } from 'lucide-react';
import { couponService } from '../../services/couponService';
import { formatPrice } from '../../utils/formatters';

export default function AdminDiscountsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    discount: '10',
    minOrderValue: '499',
    maxDiscount: '200',
    expiryDate: '2026-12-31',
    usageLimit: '500',
    description: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await couponService.getAllCoupons();
      setCoupons(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      code: '',
      type: 'percentage',
      discount: '10',
      minOrderValue: '499',
      maxDiscount: '200',
      expiryDate: '2026-12-31',
      usageLimit: '500',
      description: '',
      status: 'ACTIVE'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cpn) => {
    setIsEditing(true);
    setCurrentId(cpn.id);
    setFormData({
      code: cpn.code,
      type: cpn.type,
      discount: String(cppn.discount),
      minOrderValue: String(cpn.minOrderValue),
      maxDiscount: String(cpn.maxDiscount || ''),
      expiryDate: cpn.expiryDate,
      usageLimit: String(cpn.usageLimit),
      description: cpn.description || '',
      status: cpn.status
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      discount: Number(formData.discount),
      minOrderValue: Number(formData.minOrderValue),
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
      usageLimit: Number(formData.usageLimit)
    };

    try {
      if (isEditing) {
        await couponService.updateCoupon(currentId, payload);
      } else {
        await couponService.createCoupon(payload);
      }
      setModalOpen(false);
      fetchCoupons();
    } catch (err) {
      alert(err.message || 'Error saving coupon');
    }
  };

  const handleDelete = async (id, code) => {
    if (window.confirm(`Delete coupon "${code}"?`)) {
      try {
        await couponService.deleteCoupon(id);
        fetchCoupons();
      } catch (err) {
        alert(err.message || 'Error deleting coupon');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Discount & Promotional Coupons
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure promo codes, percentage / flat reductions, and cart value thresholds.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400">Loading coupons...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">Coupon Code</th>
                  <th className="py-3.5 px-6">Type & Discount</th>
                  <th className="py-3.5 px-6">Min Order Value</th>
                  <th className="py-3.5 px-6">Usage Count</th>
                  <th className="py-3.5 px-6">Expiry Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {coupons.map((cpn) => (
                  <tr key={cpn.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-6 font-mono font-bold text-gray-900 text-sm">
                      {cpn.code}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-semibold text-gray-800 block">
                        {cpn.type === 'percentage' ? `${cpn.discount}% OFF` : `Flat ₹${cpn.discount} OFF`}
                      </span>
                      {cpn.maxDiscount && (
                        <span className="text-[10px] text-gray-400">Up to ₹{cpn.maxDiscount}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-gray-900">
                      ₹{cpn.minOrderValue}
                    </td>
                    <td className="py-3.5 px-6 text-gray-500">
                      {cpn.usedCount || 0} / {cpn.usageLimit || '∞'}
                    </td>
                    <td className="py-3.5 px-6 text-gray-500">
                      {cpn.expiryDate}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cpn.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-primary'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {cpn.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(cpn)}
                        className="p-1.5 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-md transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cpn.id, cpn.code)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                {isEditing ? 'Edit Coupon' : 'Create New Coupon'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. MONSOON20"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none font-mono uppercase focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Discount Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Cash Amount (₹)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Customer Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Special festive discount on orders above ₹499"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

