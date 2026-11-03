export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  USE_MOCK: import.meta.env.VITE_USE_MOCK !== 'false', // defaults to true until backend is connected
  STORE_NAME: 'Shaasya Swornam Pvt. Ltd.',
  WHATSAPP_NUMBER: '919348354248',
  CURRENCY: '₹',
  DEFAULT_PAGE_SIZE: 12,
  STORAGE_KEYS: {
    CART: 'shaasya_cart_v1',
    WISHLIST: 'shaasya_wishlist_v1',
    ADMIN_TOKEN: 'shaasya_admin_token',
    ADMIN_USER: 'shaasya_admin_user',
    MOCK_ORDERS: 'shaasya_mock_orders_v1',
    MOCK_PRODUCTS: 'shaasya_mock_products_v1',
    MOCK_CATEGORIES: 'shaasya_mock_categories_v1',
    MOCK_COUPONS: 'shaasya_mock_coupons_v1',
    MOCK_SETTINGS: 'shaasya_mock_settings_v1'
  }
};

