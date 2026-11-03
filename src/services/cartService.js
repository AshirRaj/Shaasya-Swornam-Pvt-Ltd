import { CONFIG } from '../config';

export const cartService = {
  getCart() {
    try {
      const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveCart(cartItems) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(cartItems));
  },

  clearCart() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.CART);
  },

  calculateTotals(items, discountAmount = 0, shippingThreshold = 500, standardFee = 49) {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFee = subtotal === 0 || subtotal >= shippingThreshold ? 0 : standardFee;
    const finalDiscount = Math.min(discountAmount, subtotal);
    const total = Math.max(0, subtotal - finalDiscount + shippingFee);

    return {
      itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal,
      shippingFee,
      discount: finalDiscount,
      total
    };
  }
};

