import { CONFIG } from '../config';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { INITIAL_ORDERS } from '../data/initialOrders';
import { INITIAL_COUPONS } from '../data/coupons';
import { DEFAULT_STORE_SETTINGS } from '../data/storeSettings';

class MockStorage {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_PRODUCTS)) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_PRODUCTS, JSON.stringify(PRODUCTS));
    }
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_CATEGORIES)) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_CATEGORIES, JSON.stringify(CATEGORIES));
    }
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_ORDERS)) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_ORDERS, JSON.stringify(INITIAL_ORDERS));
    }
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_COUPONS)) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_COUPONS, JSON.stringify(INITIAL_COUPONS));
    }
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_SETTINGS)) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_SETTINGS, JSON.stringify(DEFAULT_STORE_SETTINGS));
    }
  }

  getProducts() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_PRODUCTS)) || PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  }

  saveProducts(products) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_PRODUCTS, JSON.stringify(products));
  }

  getCategories() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_CATEGORIES)) || CATEGORIES;
    } catch {
      return CATEGORIES;
    }
  }

  saveCategories(categories) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_CATEGORIES, JSON.stringify(categories));
  }

  getOrders() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_ORDERS)) || INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  }

  saveOrders(orders) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_ORDERS, JSON.stringify(orders));
  }

  getCoupons() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_COUPONS)) || INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  }

  saveCoupons(coupons) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_COUPONS, JSON.stringify(coupons));
  }

  getSettings() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.MOCK_SETTINGS)) || DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  }

  saveSettings(settings) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.MOCK_SETTINGS, JSON.stringify(settings));
  }
}

export const mockStorage = new MockStorage();

