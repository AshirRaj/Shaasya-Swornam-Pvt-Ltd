import { CONFIG } from '../config';

export const wishlistService = {
  getWishlist() {
    try {
      const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.WISHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveWishlist(items) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.WISHLIST, JSON.stringify(items));
  },

  clearWishlist() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.WISHLIST);
  }
};

