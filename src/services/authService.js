import apiClient from './api';
import { CONFIG } from '../config';

export const authService = {
  async login(username, password) {
    if (!CONFIG.USE_MOCK) {
      return apiClient.post('/auth/login', { username, password });
    }

    // Mock implementation for development & testing
    await new Promise((res) => setTimeout(res, 500));
    if ((username === 'admin' || username === 'admin@shaasya.com') && password === 'admin123') {
      const authData = {
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: 'admin-1',
          name: 'Store Administrator',
          email: 'admin@shaasya.com',
          role: 'ADMIN'
        }
      };
      localStorage.setItem(CONFIG.STORAGE_KEYS.ADMIN_TOKEN, authData.token);
      localStorage.setItem(CONFIG.STORAGE_KEYS.ADMIN_USER, JSON.stringify(authData.user));
      return authData;
    } else {
      throw {
        success: false,
        message: 'Invalid administrator credentials. (Hint: admin / admin123)',
        errors: { auth: 'Invalid username or password' }
      };
    }
  },

  getCurrentUser() {
    const userStr = localStorage.getItem(CONFIG.STORAGE_KEYS.ADMIN_USER);
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem(CONFIG.STORAGE_KEYS.ADMIN_TOKEN);
  },

  logout() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.ADMIN_TOKEN);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.ADMIN_USER);
    return Promise.resolve({ success: true, message: 'Logged out successfully' });
  }
};

