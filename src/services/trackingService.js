import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const trackingService = {
  async trackOrder(orderId, mobile) {
    if (!orderId || !mobile) {
      throw { success: false, message: 'Both Order ID and registered Mobile Number are required.' };
    }

    if (!CONFIG.USE_MOCK) {
      return apiClient.post('/orders/track', { orderId, mobile });
    }

    await new Promise((res) => setTimeout(res, 400));
    const orders = mockStorage.getOrders();
    const cleanMobile = String(mobile).replace(/\D/g, '').slice(-10);

    const order = orders.find((o) => {
      const matchId =
        o.id.toLowerCase() === orderId.trim().toLowerCase() ||
        o.orderNumber.toLowerCase() === orderId.trim().toLowerCase();
      const orderCustomerMobile = String(o.customer?.mobile || '').replace(/\D/g, '').slice(-10);
      return matchId && orderCustomerMobile === cleanMobile;
    });

    if (!order) {
      throw {
        success: false,
        message: 'No matching order found for this Order ID and Mobile Number. Please check your credentials.'
      };
    }

    return {
      success: true,
      data: order
    };
  }
};

