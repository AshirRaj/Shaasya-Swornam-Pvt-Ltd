import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const orderService = {
  async createOrder(orderPayload) {
    // Enforcement: Cash on Delivery must be the only payment method
    if (orderPayload.paymentMethod !== 'Cash on Delivery') {
      throw {
        success: false,
        message: 'Invalid payment method. Only Cash on Delivery is supported.',
        errors: { paymentMethod: 'Only Cash on Delivery is supported' }
      };
    }

    if (!CONFIG.USE_MOCK) {
      return apiClient.post('/orders', orderPayload);
    }

    // Mock implementation
    await new Promise((res) => setTimeout(res, 600));

    const orders = mockStorage.getOrders();
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toISOString();

    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      createdAt: now,
      customer: orderPayload.customer,
      items: orderPayload.items.map((item) => ({
        ...item,
        returnRequested: false,
        returnStatus: null
      })),
      subtotal: orderPayload.subtotal,
      discount: orderPayload.discount || 0,
      shippingFee: orderPayload.shippingFee || 0,
      total: orderPayload.total,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Pending',
      orderStatus: 'Order Placed',
      tracking: [
        {
          status: 'Order Placed',
          timestamp: now,
          notes: 'Order placed successfully. Payment of ₹' + orderPayload.total + ' to be collected upon delivery via Cash.'
        }
      ],
      canCancel: true,
      canReturn: false
    };

    orders.unshift(newOrder);
    mockStorage.saveOrders(orders);

    // Also decrement inventory for purchased items in mockStorage
    const products = mockStorage.getProducts();
    orderPayload.items.forEach((item) => {
      const p = products.find((prod) => prod.id === item.productId || prod.id === item.id);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
        p.inStock = p.stock > 0;
      }
    });
    mockStorage.saveProducts(products);

    return {
      success: true,
      data: newOrder,
      message: 'Order placed successfully via Cash on Delivery'
    };
  },

  async getOrderById(orderId) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get(`/orders/${orderId}`);
    }

    await new Promise((res) => setTimeout(res, 250));
    const orders = mockStorage.getOrders();
    const order = orders.find(
      (o) => o.id.toLowerCase() === orderId.toLowerCase() || o.orderNumber.toLowerCase() === orderId.toLowerCase()
    );

    if (!order) {
      throw { success: false, message: 'Order not found', status: 404 };
    }

    return { success: true, data: order };
  },

  async cancelOrder(orderId, reason) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.post(`/orders/${orderId}/cancel`, { reason });
    }

    await new Promise((res) => setTimeout(res, 400));
    const orders = mockStorage.getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      throw { success: false, message: 'Order not found' };
    }

    if (!order.canCancel || ['Delivered', 'Cancelled', 'Shipped'].includes(order.orderStatus)) {
      throw {
        success: false,
        message: 'Order cannot be cancelled at this stage. Please contact support or request a return upon delivery.'
      };
    }

    order.orderStatus = 'Cancelled';
    order.canCancel = false;
    order.tracking.push({
      status: 'Cancelled',
      timestamp: new Date().toISOString(),
      notes: reason ? `Cancelled by customer: ${reason}` : 'Cancelled by customer'
    });

    mockStorage.saveOrders(orders);
    return { success: true, data: order, message: 'Order cancelled successfully' };
  }
};

