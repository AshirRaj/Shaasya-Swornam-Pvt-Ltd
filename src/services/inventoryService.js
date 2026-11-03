import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const inventoryService = {
  async getInventory(filterLowStock = false) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/admin/inventory', { params: { lowStock: filterLowStock } });
    }

    await new Promise((res) => setTimeout(res, 200));
    let products = mockStorage.getProducts();
    if (filterLowStock) {
      products = products.filter((p) => p.stock < 10);
    }

    return {
      success: true,
      data: products.map((p) => ({
        id: p.id,
        sku: p.sku || `SKU-${p.id}`,
        name: p.name,
        category: p.categoryName,
        price: p.price,
        stock: p.stock,
        inStock: p.inStock,
        status: p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'In Stock'
      }))
    };
  },

  async updateStock(productId, newStock) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.put(`/admin/inventory/${productId}`, { stock: newStock });
    }

    await new Promise((res) => setTimeout(res, 250));
    const products = mockStorage.getProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw { success: false, message: 'Product not found' };
    }

    product.stock = Number(newStock);
    product.inStock = product.stock > 0;
    mockStorage.saveProducts(products);

    return { success: true, data: product, message: 'Stock updated successfully' };
  }
};

