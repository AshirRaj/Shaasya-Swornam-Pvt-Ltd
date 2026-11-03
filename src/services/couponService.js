import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const couponService = {
  async validateCoupon(code, subtotal) {
    if (!code) {
      throw { success: false, message: 'Please enter a coupon code' };
    }

    if (!CONFIG.USE_MOCK) {
      return apiClient.post('/coupons/validate', { code, subtotal });
    }

    await new Promise((res) => setTimeout(res, 300));
    const coupons = mockStorage.getCoupons();
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());

    if (!coupon) {
      throw { success: false, message: 'Invalid coupon code.' };
    }

    if (coupon.status !== 'ACTIVE') {
      throw { success: false, message: 'This coupon is no longer active.' };
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      throw { success: false, message: 'This coupon has expired.' };
    }

    if (subtotal < coupon.minOrderValue) {
      throw {
        success: false,
        message: `This coupon requires a minimum order value of ₹${coupon.minOrderValue}.`
      };
    }

    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * coupon.discount) / 100);
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    } else {
      discountAmount = coupon.discount;
    }

    return {
      success: true,
      data: {
        code: coupon.code,
        discountAmount,
        type: coupon.type,
        discount: coupon.discount,
        description: coupon.description
      },
      message: `Coupon ${coupon.code} applied successfully! You saved ₹${discountAmount}.`
    };
  },

  async getAllCoupons() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/admin/coupons');
    }
    await new Promise((res) => setTimeout(res, 200));
    return { success: true, data: mockStorage.getCoupons() };
  },

  async createCoupon(data) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.post('/admin/coupons', data);
    }
    await new Promise((res) => setTimeout(res, 300));
    const coupons = mockStorage.getCoupons();
    const newCoupon = {
      ...data,
      id: 'cpn-' + (coupons.length + 1),
      code: data.code.toUpperCase(),
      usedCount: 0,
      status: data.status || 'ACTIVE'
    };
    coupons.push(newCoupon);
    mockStorage.saveCoupons(coupons);
    return { success: true, data: newCoupon, message: 'Coupon created successfully' };
  },

  async updateCoupon(id, data) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.put(`/admin/coupons/${id}`, data);
    }
    await new Promise((res) => setTimeout(res, 300));
    const coupons = mockStorage.getCoupons();
    const index = coupons.findIndex((c) => c.id === id);
    if (index === -1) throw { success: false, message: 'Coupon not found' };
    coupons[index] = { ...coupons[index], ...data, code: data.code ? data.code.toUpperCase() : coupons[index].code };
    mockStorage.saveCoupons(coupons);
    return { success: true, data: coupons[index], message: 'Coupon updated successfully' };
  },

  async deleteCoupon(id) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.delete(`/admin/coupons/${id}`);
    }
    await new Promise((res) => setTimeout(res, 300));
    let coupons = mockStorage.getCoupons();
    coupons = coupons.filter((c) => c.id !== id);
    mockStorage.saveCoupons(coupons);
    return { success: true, message: 'Coupon deleted successfully' };
  }
};

