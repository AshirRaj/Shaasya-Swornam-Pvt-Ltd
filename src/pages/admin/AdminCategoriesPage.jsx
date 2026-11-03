import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Layers } from 'lucide-react';
import { categoryService } from '../../services/categoryService';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '/img/service1.jpg',
    group: 'Collection'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryService.getCategories();
      setCategories(res.data || []);
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
      name: '',
      slug: '',
      description: '',
      image: '/img/service1.jpg',
      group: 'Collection'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setIsEditing(true);
    setCurrentId(cat.id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      group: cat.group || 'Collection'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };

    try {
      if (isEditing) {
        await categoryService.updateCategory(currentId, payload);
      } else {
        await categoryService.createCategory(payload);
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      alert(err.message || 'Error saving category');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        await categoryService.deleteCategory(id);
        fetchCategories();
      } catch (err) {
        alert(err.message || 'Error deleting category');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Category Management
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Organize products into nursery collections and organic produce categories.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400">Loading categories...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Slug</th>
                  <th className="py-3.5 px-6">Group</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-6">Items</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-100 bg-gray-50"
                          onError={(e) => {
                            e.target.src = '/img/Swarna-logo.png';
                          }}
                        />
                        <span className="font-bold text-gray-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-gray-500">{c.slug}</td>
                    <td className="py-3.5 px-6">
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {c.group || 'Collection'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-gray-500 max-w-xs truncate">
                      {c.description}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-primary">{c.itemCount}</td>
                    <td className="py-3.5 px-6 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-1.5 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-md transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
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
                {isEditing ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Slug (URL path)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. organic-dal"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Group</label>
                  <select
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  >
                    <option value="Collection">Nursery Collection</option>
                    <option value="Organic Items">Organic Produce & Items</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Banner Image URL</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary"
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

