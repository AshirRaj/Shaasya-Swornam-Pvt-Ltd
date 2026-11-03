import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const adminService = {
  async getDashboardStats() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/admin/dashboard/stats');
    }

    await new Promise((res) => setTimeout(res, 300));
    const orders = mockStorage.getOrders();
    const products = mockStorage.getProducts();

    const totalRevenue = orders
      .filter((o) => o.orderStatus !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = orders.filter((o) =>
      ['Order Placed', 'Confirmed', 'Processing'].includes(o.orderStatus)
    ).length;

    const lowStockProducts = products.filter((p) => p.stock < 10).length;

    // Unique customers by mobile number
    const uniqueCustomers = new Set(orders.map((o) => o.customer?.mobile)).size;

    return {
      success: true,
      data: {
        totalOrders: orders.length,
        totalRevenue,
        totalCustomers: uniqueCustomers || 1,
        totalProducts: products.length,
        pendingOrders,
        lowStockProducts,
        recentOrders: orders.slice(0, 5)
      }
    };
  },

  async getOrders(params = {}) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/admin/orders', { params });
    }

    await new Promise((res) => setTimeout(res, 250));
    let orders = mockStorage.getOrders();

    if (params.status && params.status !== 'all') {
      orders = orders.filter((o) => o.orderStatus === params.status);
    }

    if (params.search) {
      const q = params.search.toLowerCase().trim();
      orders = orders.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer?.fullName.toLowerCase().includes(q) ||
          o.customer?.mobile.includes(q) ||
          o.customer?.city.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      data: orders
    };
  },

  async updateOrderStatus(orderId, newStatus, notes) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.put(`/admin/orders/${orderId}/status`, { status: newStatus, notes });
    }

    await new Promise((res) => setTimeout(res, 300));
    const orders = mockStorage.getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      throw { success: false, message: 'Order not found' };
    }

    order.orderStatus = newStatus;
    if (newStatus === 'Delivered') {
      order.paymentStatus = 'Collected'; // COD collected upon delivery
      order.canReturn = true;
      order.canCancel = false;
    } else if (newStatus === 'Cancelled') {
      order.canCancel = false;
    }

    order.tracking.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      notes: notes || `Order status updated to ${newStatus} by store administrator`
    });

    mockStorage.saveOrders(orders);
    return { success: true, data: order, message: `Order updated to ${newStatus}` };
  },

  async updatePaymentStatus(orderId, paymentStatus) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.put(`/admin/orders/${orderId}/payment-status`, { paymentStatus });
    }

    await new Promise((res) => setTimeout(res, 300));
    const orders = mockStorage.getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      throw { success: false, message: 'Order not found' };
    }

    order.paymentStatus = paymentStatus;
    mockStorage.saveOrders(orders);
    return { success: true, data: order, message: `Payment status updated to ${paymentStatus}` };
  },

  async getCustomers() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/admin/customers');
    }

    await new Promise((res) => setTimeout(res, 250));
    const orders = mockStorage.getOrders();
    const customerMap = new Map();

    orders.forEach((o) => {
      const mob = o.customer?.mobile;
      if (!mob) return;

      if (!customerMap.has(mob)) {
        customerMap.set(mob, {
          id: 'cust-' + mob,
          fullName: o.customer.fullName,
          mobile: mob,
          email: o.customer.email || 'N/A',
          city: o.customer.city,
          state: o.customer.state,
          pincode: o.customer.pincode,
          address: o.customer.address,
          totalOrders: 0,
          totalSpent: 0,
          lastOrderDate: o.createdAt
        });
      }

      const c = customerMap.get(mob);
      c.totalOrders += 1;
      if (o.orderStatus !== 'Cancelled') {
        c.totalSpent += o.total;
      }
    });

    return {
      success: true,
      data: Array.from(customerMap.values())
    };
  }
};

