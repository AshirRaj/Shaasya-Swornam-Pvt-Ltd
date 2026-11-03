import React, { useState, useEffect } from 'react';
import { Users, Search, Phone, Mail, MapPin } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { formatPrice, formatDate } from '../../utils/formatters';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getCustomers();
      setCustomers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile?.includes(search) ||
      c.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Customers & Contact Directory
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Aggregated profile records of guest shoppers and delivery locations.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search customer name, mobile, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:border-primary outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400">Loading customer directory...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400">No customers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">Customer Name</th>
                  <th className="py-3.5 px-6">Contact Info</th>
                  <th className="py-3.5 px-6">Primary Location</th>
                  <th className="py-3.5 px-6">Orders Placed</th>
                  <th className="py-3.5 px-6">Total Spend (COD)</th>
                  <th className="py-3.5 px-6">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-6 font-bold text-gray-900">
                      {c.fullName}
                    </td>
                    <td className="py-3.5 px-6 space-y-0.5">
                      <div className="flex items-center space-x-1.5 text-gray-800">
                        <Phone className="w-3 h-3 text-primary" />
                        <span>+91 {c.mobile}</span>
                      </div>
                      {c.email && c.email !== 'N/A' && (
                        <div className="flex items-center space-x-1.5 text-gray-400 text-[11px]">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{c.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-gray-600">
                      {c.city}, {c.state} ({c.pincode})
                    </td>
                    <td className="py-3.5 px-6 font-bold text-primary">
                      {c.totalOrders} {c.totalOrders === 1 ? 'order' : 'orders'}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-gray-900">
                      {formatPrice(c.totalSpent)}
                    </td>
                    <td className="py-3.5 px-6 text-gray-400 text-[11px]">
                      {formatDate(c.lastOrderDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

