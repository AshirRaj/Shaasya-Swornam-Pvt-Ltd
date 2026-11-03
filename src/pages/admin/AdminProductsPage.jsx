import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Check, Package } from 'lucide-react';
import { productService } from '../../services/productService';
import { CATEGORIES } from '../../data/categories';
import { formatPrice } from '../../utils/formatters';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'plants',
    price: '',
    mrp: '',
    stock: '',
    image: '/img/p-1.webp',
    description: '',
    variants: 'Standard'
  });

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productService.getProducts({
        category: categoryFilter === 'all' ? undefined : categoryFilter,
        search,
        limit: 100
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      name: '',
      category: 'plants',
      price: '',
      mrp: '',
      stock: '25',
      image: '/img/p-1.webp',
      description: '',
      variants: 'Standard'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setIsEditing(true);
    setCurrentId(prod.id);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: String(prod.price),
      mrp: String(prod.mrp || ''),
      stock: String(prod.stock),
      image: prod.image,
      description: prod.description || '',
      variants: Array.isArray(prod.variants) ? prod.variants.join(', ') : 'Standard'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const catObj = CATEGORIES.find((c) => c.slug === formData.category) || CATEGORIES[0];
    const variantsArray = formData.variants
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      categoryName: catObj.name,
      price: Number(formData.price),
      mrp: Number(formData.mrp) || Math.round(Number(formData.price) * 1.25),
      stock: Number(formData.stock),
      image: formData.image,
      description: formData.description,
      variants: variantsArray.length > 0 ? variantsArray : ['Standard']
    };

    try {
      if (isEditing) {
        await productService.updateProduct(currentId, payload);
      } else {
        await productService.createProduct(payload);
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Error saving product');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        alert(err.message || 'Error deleting product');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Products Catalog
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your store's plant, seed, fertilizer, and organic food listings.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchProducts();
          }}
          className="relative w-full md:w-80"
        >
          <input
            type="text"
            placeholder="Search by product title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </form>

        <div className="w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none w-full md:w-auto cursor-pointer"
          >
            <option value="all">All Categories ({products.length} products)</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400">Loading catalog...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Price</th>
                  <th className="py-3.5 px-6">Variants</th>
                  <th className="py-3.5 px-6">Stock</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded-lg bg-gray-50 border border-gray-100 p-0.5 flex-shrink-0"
                          onError={(e) => {
                            e.target.src = '/img/Swarna-logo.png';
                          }}
                        />
                        <div className="truncate max-w-xs">
                          <p className="font-bold text-gray-900 truncate">{p.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">SKU: {p.sku || p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-gray-600">
                      {p.categoryName}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-gray-900">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-3.5 px-6 text-gray-500">
                      {p.variants?.join(', ')}
                    </td>
                    <td className="py-3.5 px-6 font-bold">
                      {p.stock}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.stock > 10
                            ? 'bg-emerald-100 text-primary'
                            : p.stock > 0
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-md transition"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                        title="Delete Product"
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                {isEditing ? 'Edit Product' : 'Add New Organic Product'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. 24 Mantra Organic Moong Dal"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary font-medium"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Units In Stock</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Variants (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.variants}
                  onChange={(e) => setFormData({ ...formData, variants: e.target.value })}
                  placeholder="e.g. 500g, 1kg, 5kg"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Organic benefits, certified origin, cultivation details..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

