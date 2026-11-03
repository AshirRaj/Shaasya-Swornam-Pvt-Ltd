import React, { useState, useEffect } from 'react';
import { BarChart3, Download, TrendingUp, ShoppingBag, Package } from 'lucide-react';
import { reportService } from '../../services/reportService';
import { formatPrice } from '../../utils/formatters';

export default function AdminReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await reportService.getSalesReport();
      setReportData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    reportService.exportOrdersToCSV();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Analytics & Reports
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Evaluate organic sales performance, product velocity, and export CSV ledger.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-2 self-start"
        >
          <Download className="w-4 h-4" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-gray-400">Loading reports...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Products Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="font-serif font-bold text-base text-gray-900">
                Best-Selling Products
              </h3>
            </div>

            <div className="space-y-3">
              {reportData?.topSelling?.length === 0 ? (
                <p className="text-xs text-gray-400">No sales recorded yet.</p>
              ) : (
                reportData?.topSelling?.map((prod, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-gray-50">
                    <span className="font-semibold text-gray-800 truncate pr-2">
                      {idx + 1}. {prod.name}
                    </span>
                    <span className="bg-emerald-100 text-primary px-2.5 py-0.5 rounded-full font-bold flex-shrink-0">
                      {prod.units} units sold
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Fulfillment Breakdown Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
              <ShoppingBag className="w-5 h-5 text-secondary" />
              <h3 className="font-serif font-bold text-base text-gray-900">
                Fulfillment Distribution
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-gray-50">
                <span className="text-gray-600">Total Orders Logged</span>
                <span className="font-bold text-gray-900">{reportData?.totalOrdersCount}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-emerald-50 text-emerald-900">
                <span className="font-medium">Successfully Delivered (Cash Collected)</span>
                <span className="font-bold text-primary">{reportData?.deliveredOrdersCount}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-red-50 text-red-900">
                <span className="font-medium">Cancelled Orders</span>
                <span className="font-bold text-red-600">{reportData?.cancelledOrdersCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

