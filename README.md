# Shaasya Swornam Pvt. Ltd. — E-Commerce Frontend Rebuild

A complete, modern e-commerce web platform for **Shaasya Swornam Pvt. Ltd.** built with **Vite**, **React**, **JavaScript**, **React Router**, and **Tailwind CSS**.

Preserves the original brand aesthetic (colors `#3CB815` & `#F65005`, typography, produce marquee, nursery collections, organic groceries) while delivering a responsive, production-ready shopping and administrative experience designed for seamless integration with a **Spring Boot** backend.

---

## 🌟 Key Features

### 🛒 Customer Storefront
- **Responsive Navigation**: Top bar with contact info, sticky header, multi-level collection dropdowns, and mobile navigation drawer.
- **Product Catalog & Filters**: 85 unique organic products across 12 categories, with instant search, price range filter, sorting (price, popularity, rating, alphabetical), and pagination.
- **Product Details Showcase**: Image gallery, variant selection (e.g. 500g, 1kg, 5kg), quantity controls, live stock availability, and related product recommendations.
- **Persistent Shopping Cart & Wishlist**: Browser-stored guest cart and wishlist that persist across page refreshes. Features interactive promo coupon validation and a dynamic free-shipping progress meter.
- **Doorstep Cash on Delivery (COD) Checkout**: Frictionless guest checkout (no registration required) with Indian mobile number and PIN code validation. COD is strictly the only payment method.
- **Order Confirmation & Guest Order Tracking**: Order status timeline tracking (`Order Placed` ➔ `Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`) via Order ID and mobile number.
- **Individual Item Returns & Cancellations**: Allows customers to cancel pending orders or return single items from multi-item orders without altering the rest.
- **Hydroponic & Farm Services**: Dedicated page for turnkey commercial, rooftop, and indoor hydroponic farm solutions.
- **Floating WhatsApp Support Button**: Fixed bottom-right customer support button with prefilled greeting, configured via centralized settings and automatically hidden in the admin dashboard.

### 🛡️ Admin Dashboard (`/admin`)
- **Protected Admin Console**: Secured route guard requiring admin login (`admin` / `admin123`).
- **Dashboard Metrics**: Revenue, orders, customers, active products, pending orders alert, and low-stock warnings.
- **Order Management**: Advance delivery statuses across the 7-step lifecycle, update COD collection status, and view customer details.
- **Products Catalog**: Add, edit, and delete products, update pricing, images, and variants.
- **Category Management**: Edit category details, banners, and groupings.
- **Inventory Control**: Real-time stock counts with inline editing and low-stock alerts.
- **Customer Directory**: Guest shopper records aggregated by mobile number with order history and spend.
- **Discounts & Coupons**: Create percentage or fixed-amount discount coupons with validity limits.
- **Cash on Delivery Reconciliation**: Reconcile cash in-transit against collected funds.
- **Returns & Refunds**: Review, approve, or reject customer return requests.
- **Reports & CSV Export**: Sales analytics and one-click order export to CSV.
- **Website Settings**: Manage store details, free delivery thresholds, and WhatsApp contact numbers.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

1. Open a terminal in this project directory:
   ```bash
   cd "Shaasya Swornam Pvt Ltd"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional, already set up for development):
   ```bash
   cp .env.example .env
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

5. Build for production:
   ```bash
   npm run build
   ```
   The compiled static assets will be output to the `dist/` folder.

---

## 🔑 Default Credentials (Development Mode)

- **Admin Login URL**: `/admin/login`
- **Username**: `admin` or `admin@shaasya.com`
- **Password**: `admin123`

---

## 🔌 Connecting to Spring Boot Backend

The application includes a centralized Axios client at `src/services/api.js`.

To connect to your live Spring Boot backend:
1. Update `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_USE_MOCK=false
   ```
2. See [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) for the complete list of backend endpoints, request payloads, response structures, and validation rules.

---

## 📚 Technical Documentation

- **[`docs/API_CONTRACT.md`](docs/API_CONTRACT.md)**: Exhaustive REST API contract for the Spring Boot developer.
- **[`docs/FRONTEND_GUIDE.md`](docs/FRONTEND_GUIDE.md)**: Frontend architecture, state management, and component hierarchy.
- **[`docs/ADMIN_GUIDE.md`](docs/ADMIN_GUIDE.md)**: Admin portal features and workflows.

---

## 🌿 Brand Identity & Design System

- **Primary Color**: `#3CB815` (Eco Farm Green)
- **Secondary Color**: `#F65005` (Vibrant Harvest Orange)
- **Headings Font**: `Lora` (Serif)
- **Body Font**: `Open Sans` (Sans-Serif)
- **Payment Model**: 100% Cash on Delivery

