import apiClient from './api';
import { CONFIG } from '../config';
import { mockStorage } from './mockStorage';

export const settingsService = {
  async getSettings() {
    if (!CONFIG.USE_MOCK) {
      return apiClient.get('/settings');
    }
    await new Promise((res) => setTimeout(res, 100));
    return { success: true, data: mockStorage.getSettings() };
  },

  async updateSettings(newSettings) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.put('/admin/settings', newSettings);
    }
    await new Promise((res) => setTimeout(res, 300));
    const current = mockStorage.getSettings();
    const updated = { ...current, ...newSettings };
    mockStorage.saveSettings(updated);
    return { success: true, data: updated, message: 'Website settings saved successfully' };
  }
};

