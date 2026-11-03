import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const productService = {
  async getProducts(params = {}) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/products', { params });
    }

    // Mock search, filter, sort & pagination
    await new Promise((res) => setTimeout(res, 250));
    let products = mockStorage.getProducts();

    if (params.category && params.category !== 'all') {
      products = products.filter(
        (p) => p.category === params.category || p.category.toLowerCase() === params.category.toLowerCase()
      );
    }

    if (params.search) {
      const q = params.search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (params.minPrice) {
      products = products.filter((p) => p.price >= Number(params.minPrice));
    }

    if (params.maxPrice) {
      products = products.filter((p) => p.price <= Number(params.maxPrice));
    }

    if (params.sort) {
      switch (params.sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => Number(b.rating) - Number(a.rating));
          break;
        case 'name-asc':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'popularity':
        default:
          products.sort((a, b) => b.reviewsCount - a.reviewsCount);
          break;
      }
    }

    const total = products.length;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || CONFIG.DEFAULT_PAGE_SIZE;
    const startIndex = (page - 1) * limit;
    const paginated = products.slice(startIndex, startIndex + limit);

    return {
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  async getProductById(id) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get(`/products/${id}`);
    }

    await new Promise((res) => setTimeout(res, 200));
    const products = mockStorage.getProducts();
    const product = products.find((p) => p.id === id || p.slug === id);
    if (!product) {
      throw { success: false, message: 'Product not found', status: 404 };
    }
    return { success: true, data: product };
  },

  async getFeaturedProducts() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/products/featured');
    }
    await new Promise((res) => setTimeout(res, 150));
    const products = mockStorage.getProducts();
    return { success: true, data: products.filter((p) => p.isFeatured).slice(0, 8) };
  },

  async getFreshArrivals() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/products/fresh-arrivals');
    }
    await new Promise((res) => setTimeout(res, 150));
    const products = mockStorage.getProducts();
    return { success: true, data: products.filter((p) => p.isFreshArrival).slice(0, 8) };
  },

  // Admin mutation endpoints
  async createProduct(productData) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.post('/products', productData);
    }
    await new Promise((res) => setTimeout(res, 300));
    const products = mockStorage.getProducts();
    const newProduct = {
      ...productData,
      id: 'prod-' + (products.length + 1),
      slug: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: '4.8',
      reviewsCount: 1,
      inStock: Number(productData.stock) > 0,
      variants: productData.variants || ['Standard']
    };
    products.unshift(newProduct);
    mockStorage.saveProducts(products);
    return { success: true, data: newProduct, message: 'Product created successfully' };
  },

  async updateProduct(id, productData) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.put(`/products/${id}`, productData);
    }
    await new Promise((res) => setTimeout(res, 300));
    const products = mockStorage.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw { success: false, message: 'Product not found' };
    }
    products[index] = { ...products[index], ...productData, inStock: Number(productData.stock) > 0 };
    mockStorage.saveProducts(products);
    return { success: true, data: products[index], message: 'Product updated successfully' };
  },

  async deleteProduct(id) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.delete(`/products/${id}`);
    }
    await new Promise((res) => setTimeout(res, 300));
    let products = mockStorage.getProducts();
    products = products.filter((p) => p.id !== id);
    mockStorage.saveProducts(products);
    return { success: true, message: 'Product deleted successfully' };
  }
};

