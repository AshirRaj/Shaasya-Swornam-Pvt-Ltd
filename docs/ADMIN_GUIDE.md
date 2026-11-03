# Admin Portal User & Integration Guide — Shaasya Swornam

The Shaasya Swornam Store Administration Portal provides full back-office control over catalog listings, Cash on Delivery orders, inventory counts, and customer inquiries.

---

## 1. Access & Authentication

- **URL**: `/admin/login`
- **Default Dev Credentials**:
  - **Username / Email**: `admin` or `admin@shaasya.com`
  - **Password**: `admin123`
- **Route Guarding**: All `/admin/*` routes are protected by `AdminLayout.jsx`. Unauthorized visitors are redirected to `/admin/login`.

---

## 2. Admin Modules Overview

### 1. Dashboard (`/admin`)
- Displays real-time counts: **Total Orders**, **Total COD Revenue**, **Unique Customers**, and **Active Products**.
- Alerts for **Pending Orders** requiring dispatch and **Low Stock Items** (< 10 units).
- Quick table of recent customer orders with one-click navigation.

### 2. Order Management (`/admin/orders`)
- Filter orders by status: `Order Placed`, `Confirmed`, `Processing`, `Shipped`, `Out for Delivery`, `Delivered`, `Cancelled`.
- Search orders by ID, customer name, mobile number, or city.
- Inspect full order drawer:
  - Customer contact and shipping address.
  - Item thumbnails, variants, and quantities.
  - Advance the order status across the 7 lifecycle states.
  - Toggle Cash on Delivery collection state (`Pending` <-> `Collected`).

### 3. Products Catalog (`/admin/products`)
- Tabular catalog view with thumbnail, category, price, variants, and stock badge.
- Add new products with categories, selling price, MRP, variants, and descriptions.
- Edit existing products or delete discontinued items.

### 4. Category Management (`/admin/categories`)
- Manage 12 product categories grouped under Nursery Collection and Organic Produce.
- Add and edit categories with banner images and URLs.

### 5. Inventory & Stock Control (`/admin/inventory`)
- Track SKUs, unit prices, and available quantities.
- Filter by "Low Stock Only" (< 10 units) to trigger immediate restock.
- Quick inline stock editing with one-click save.

### 6. Customer Directory (`/admin/customers`)
- Aggregates guest orders by mobile number.
- Displays total order count, lifetime spend (COD), and primary delivery address.

### 7. Discounts & Promo Codes (`/admin/coupons`)
- Create promotional coupon codes with:
  - Discount type (Percentage % or Flat ₹).
  - Minimum order value (e.g. ₹499).
  - Maximum discount cap.
  - Expiry date and usage limit.

### 8. Cash on Delivery Reconciliation (`/admin/payments`)
- Dedicated ledger for cash management.
- Reconciles cash collected by couriers upon delivery against in-transit COD orders.

### 9. Returns & Refund Authorizations (`/admin/returns`)
- Review return requests submitted by customers for individual items.
- Approve or reject return claims with remarks.
- Track refund state (e.g. "Refund Initiated", "Processed").

### 10. Analytics & Reports (`/admin/reports`)
- Visual breakdown of best-selling products.
- Order fulfillment distribution (delivered vs cancelled).
- **One-click CSV Export**: Downloads complete order ledger formatted for accounting or Excel.

### 11. Website Settings (`/admin/settings`)
- Update store phone, email, and nursery address.
- Configure floating WhatsApp support phone number and customer greeting message.
- Adjust free delivery threshold (default: ₹500) and standard shipping charge (default: ₹49).

