import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const categoryService = {
  async getCategories() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/categories');
    }
    await new Promise((res) => setTimeout(res, 150));
    return { success: true, data: mockStorage.getCategories() };
  },

  async getCategoryBySlug(slug) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get(`/categories/${slug}`);
    }
    await new Promise((res) => setTimeout(res, 150));
    const categories = mockStorage.getCategories();
    const cat = categories.find((c) => c.slug === slug || c.id === slug);
    if (!cat) {
      throw { success: false, message: 'Category not found' };
    }
    return { success: true, data: cat };
  },

  async createCategory(catData) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.post('/categories', catData);
    }
    await new Promise((res) => setTimeout(res, 250));
    const categories = mockStorage.getCategories();
    const newCat = {
      ...catData,
      id: catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      itemCount: 0
    };
    categories.push(newCat);
    mockStorage.saveCategories(categories);
    return { success: true, data: newCat, message: 'Category created successfully' };
  },

  async updateCategory(id, catData) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.put(`/categories/${id}`, catData);
    }
    await new Promise((res) => setTimeout(res, 250));
    const categories = mockStorage.getCategories();
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) {
      throw { success: false, message: 'Category not found' };
    }
    categories[index] = { ...categories[index], ...catData };
    mockStorage.saveCategories(categories);
    return { success: true, data: categories[index], message: 'Category updated successfully' };
  },

  async deleteCategory(id) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.delete(`/categories/${id}`);
    }
    await new Promise((res) => setTimeout(res, 250));
    let categories = mockStorage.getCategories();
    categories = categories.filter((c) => c.id !== id);
    mockStorage.saveCategories(categories);
    return { success: true, message: 'Category deleted successfully' };
  }
};

