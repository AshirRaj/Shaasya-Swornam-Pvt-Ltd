import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const reportService = {
  async getSalesReport() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/admin/reports/sales');
    }

    await new Promise((res) => setTimeout(res, 300));
    const orders = mockStorage.getOrders();
    const products = mockStorage.getProducts();

    // Group sales by day/order
    const salesTimeline = orders.map((o) => ({
      date: o.createdAt.split('T')[0],
      orderId: o.id,
      amount: o.orderStatus === 'Cancelled' ? 0 : o.total,
      status: o.orderStatus
    }));

    // Top selling items
    const productSalesMap = {};
    orders.forEach((o) => {
      if (o.orderStatus !== 'Cancelled') {
        o.items.forEach((item) => {
          productSalesMap[item.title] = (productSalesMap[item.title] || 0) + item.quantity;
        });
      }
    });

    const topSelling = Object.entries(productSalesMap)
      .map(([name, units]) => ({ name, units }))
      .sort((a, b) => b.units - a.units)
      .slice(0, 5);

    return {
      success: true,
      data: {
        totalOrdersCount: orders.length,
        deliveredOrdersCount: orders.filter((o) => o.orderStatus === 'Delivered').length,
        cancelledOrdersCount: orders.filter((o) => o.orderStatus === 'Cancelled').length,
        topSelling,
        salesTimeline
      }
    };
  },

  exportOrdersToCSV() {
    const orders = mockStorage.getOrders();
    const headers = ['Order ID', 'Date', 'Customer Name', 'Mobile', 'City', 'Status', 'Total', 'Payment Method', 'Payment Status'];
    const rows = orders.map((o) => [
      o.id,
      o.createdAt.split('T')[0],
      `"${o.customer?.fullName || ''}"`,
      o.customer?.mobile || '',
      `"${o.customer?.city || ''}"`,
      o.orderStatus,
      o.total,
      o.paymentMethod,
      o.paymentStatus
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `shaasya_orders_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

