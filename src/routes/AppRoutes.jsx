import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Customer Pages
import HomePage from '../pages/customer/HomePage';
import ProductsPage from '../pages/customer/ProductsPage';
import CategoriesPage from '../pages/customer/CategoriesPage';
import ProductDetailPage from '../pages/customer/ProductDetailPage';
import SearchResultsPage from '../pages/customer/SearchResultsPage';
import WishlistPage from '../pages/customer/WishlistPage';
import CartPage from '../pages/customer/CartPage';
import CheckoutPage from '../pages/customer/CheckoutPage';
import ServicesPage from '../pages/customer/ServicesPage';

// Order Pages
import OrderConfirmationPage from '../pages/orders/OrderConfirmationPage';
import OrderTrackingPage from '../pages/orders/OrderTrackingPage';
import ReturnsCancellationsPage from '../pages/orders/ReturnsCancellationsPage';

// Support & Policy Pages
import AboutPage from '../pages/support/AboutPage';
import ContactPage from '../pages/support/ContactPage';
import FaqsPage from '../pages/support/FaqsPage';
import ShippingPolicyPage from '../pages/support/ShippingPolicyPage';
import RefundPolicyPage from '../pages/support/RefundPolicyPage';
import PrivacyPolicyPage from '../pages/support/PrivacyPolicyPage';
import TermsConditionsPage from '../pages/support/TermsConditionsPage';
import NotFoundPage from '../pages/common/NotFoundPage';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage';
import AdminProductsPage from '../pages/admin/AdminProductsPage';
import AdminCategoriesPage from '../pages/admin/AdminCategoriesPage';
import AdminInventoryPage from '../pages/admin/AdminInventoryPage';
import AdminCustomersPage from '../pages/admin/AdminCustomersPage';
import AdminDiscountsPage from '../pages/admin/AdminDiscountsPage';
import AdminPaymentsPage from '../pages/admin/AdminPaymentsPage';
import AdminReturnsPage from '../pages/admin/AdminReturnsPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Customer Facing Store Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:categorySlug" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/track-order" element={<OrderTrackingPage />} />
        <Route path="/returns-cancellations" element={<ReturnsCancellationsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Protected Dashboard Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="coupons" element={<AdminDiscountsPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="returns" element={<AdminReturnsPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}

