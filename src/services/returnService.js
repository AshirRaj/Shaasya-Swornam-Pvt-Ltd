import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const returnService = {
  async requestItemReturn({ orderId, productId, variant, reason, comments, bankDetails }) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.post('/returns/request', {
        orderId,
        productId,
        variant,
        reason,
        comments,
        bankDetails
      });
    }

    await new Promise((res) => setTimeout(res, 500));
    const orders = mockStorage.getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      throw { success: false, message: 'Order not found' };
    }

    const item = order.items.find(
      (i) => (i.productId === productId || i.id === productId) && (variant ? i.variant === variant : true)
    );

    if (!item) {
      throw { success: false, message: 'Product item not found in this order' };
    }

    if (item.returnRequested) {
      throw { success: false, message: 'A return request is already logged for this product item.' };
    }

    // Flag individual item as return requested
    item.returnRequested = true;
    item.returnStatus = 'Pending';
    item.returnReason = reason;
    item.returnComments = comments || '';
    item.returnRequestedAt = new Date().toISOString();
    item.refundStatus = 'Pending Verification'; // Pending Verification, Approved, Refund Initiated, Refunded, Rejected

    order.tracking.push({
      status: 'Return Requested',
      timestamp: new Date().toISOString(),
      notes: `Return requested for item: ${item.title} (${reason})`
    });

    mockStorage.saveOrders(orders);

    return {
      success: true,
      data: order,
      message: `Return request submitted successfully for ${item.title}. Our team will review within 24-48 hours.`
    };
  },

  async getAllReturns() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/admin/returns');
    }

    await new Promise((res) => setTimeout(res, 300));
    const orders = mockStorage.getOrders();
    const returnList = [];

    orders.forEach((o) => {
      o.items.forEach((item) => {
        if (item.returnRequested) {
          returnList.push({
            returnId: `RET-${o.id}-${item.productId}`,
            orderId: o.id,
            createdAt: item.returnRequestedAt || o.createdAt,
            customer: o.customer,
            item: item,
            reason: item.returnReason,
            comments: item.returnComments,
            returnStatus: item.returnStatus || 'Pending',
            refundStatus: item.refundStatus || 'Pending Verification'
          });
        }
      });
    });

    return { success: true, data: returnList };
  },

  async updateReturnStatus(orderId, productId, status, refundStatus, note) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.put(`/admin/returns/${orderId}/${productId}/status`, {
        status,
        refundStatus,
        note
      });
    }

    await new Promise((res) => setTimeout(res, 300));
    const orders = mockStorage.getOrders();
    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      throw { success: false, message: 'Order not found' };
    }

    const item = order.items.find((i) => i.productId === productId || i.id === productId);
    if (!item) {
      throw { success: false, message: 'Item not found' };
    }

    item.returnStatus = status;
    if (refundStatus) item.refundStatus = refundStatus;

    order.tracking.push({
      status: `Return ${status}`,
      timestamp: new Date().toISOString(),
      notes: note || `Return for ${item.title} has been marked as ${status}.`
    });

    mockStorage.saveOrders(orders);
    return { success: true, data: order, message: `Return status updated to ${status}` };
  }
};

