import React, { useState, useEffect } from 'react';
import { Boxes, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { inventoryService } from '../../services/inventoryService';
import { formatPrice } from '../../utils/formatters';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editStockVal, setEditStockVal] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, [filterLowStock]);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await inventoryService.getInventory(filterLowStock);
      setInventory(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditStockVal(String(item.stock));
  };

  const handleSaveStock = async (id) => {
    setUpdating(true);
    try {
      await inventoryService.updateStock(id, Number(editStockVal));
      setEditingId(null);
      fetchInventory();
    } catch (err) {
      alert(err.message || 'Error updating stock');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Inventory & Stock Management
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor real-time warehouse inventory and update stock levels instantly.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterLowStock(!filterLowStock)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              filterLowStock
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Show Low Stock Only (&lt; 10)</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400">Loading inventory...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">SKU</th>
                  <th className="py-3.5 px-6">Product Title</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Unit Price</th>
                  <th className="py-3.5 px-6">Available Stock</th>
                  <th className="py-3.5 px-6">Health Status</th>
                  <th className="py-3.5 px-6 text-right">Adjust Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-6 font-mono text-gray-400">{item.sku}</td>
                    <td className="py-3.5 px-6 font-bold text-gray-900">{item.name}</td>
                    <td className="py-3.5 px-6 text-gray-500">{item.category}</td>
                    <td className="py-3.5 px-6 font-semibold text-gray-900">{formatPrice(item.price)}</td>
                    <td className="py-3.5 px-6 font-mono font-bold text-sm">
                      {editingId === item.id ? (
                        <input
                          type="number"
                          value={editStockVal}
                          onChange={(e) => setEditStockVal(e.target.value)}
                          className="w-20 px-2 py-1 text-xs border border-primary rounded-md outline-none"
                          autoFocus
                        />
                      ) : (
                        item.stock
                      )}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'In Stock'
                            ? 'bg-emerald-100 text-primary'
                            : item.status === 'Low Stock'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {editingId === item.id ? (
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleSaveStock(item.id)}
                            disabled={updating}
                            className="p-1.5 bg-primary text-white rounded-md hover:bg-primary-hover shadow-xs"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Quick Edit
                        </button>
                      )}
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

