# Frontend Architecture & Developer Guide — Shaasya Swornam

This guide provides technical onboarding for developers working on the **Shaasya Swornam React Frontend**.

---

## 1. Technology Stack

- **Core**: React 18, Vite 6, JavaScript (ES Modules, strictly no TypeScript as requested).
- **Routing**: React Router v6 (`react-router-dom`).
- **Styling**: Tailwind CSS with custom palette matching the original website (`#3CB815` primary green, `#F65005` secondary orange).
- **Icons**: Lucide React (`lucide-react`).
- **HTTP Client**: Axios (`axios`) with request/response interceptors.
- **Storage**: `localStorage` browser persistence for Cart, Wishlist, and fallback Mock Database.

---

## 2. Directory Architecture

```text
Shaasya Swornam Pvt Ltd/
├── public/
│   ├── img/                 # 175 original website images, logos, sliders & icons
│   └── assets/
├── src/
│   ├── assets/              # Component-level static assets
│   ├── components/
│   │   ├── common/          # Reusable UI widgets (WhatsAppButton, etc.)
│   │   ├── layout/          # Header (with top-bar & dropdowns) and Footer
│   │   ├── products/        # ProductCard with variant selector & hover zoom
│   │   ├── cart/            # CartDrawer with free-shipping meter
│   │   └── admin/           # Admin modals and shared widgets
│   ├── pages/
│   │   ├── customer/        # HomePage, ProductsPage, CategoriesPage, ProductDetailPage, etc.
│   │   ├── orders/          # CheckoutPage, OrderConfirmationPage, OrderTrackingPage, ReturnsPage
│   │   ├── support/         # AboutPage, ContactPage, FaqsPage, ShippingPolicyPage, etc.
│   │   └── admin/           # AdminDashboard, AdminOrders, AdminProducts, etc.
│   ├── layouts/
│   │   ├── MainLayout.jsx   # Storefront layout (Header, Outlet, Footer, WhatsAppButton, CartDrawer)
│   │   └── AdminLayout.jsx  # Admin portal layout (Sidebar, Top Bar, Protected Route Check)
│   ├── context/
│   │   ├── CartContext.jsx  # Guest cart state + promo code discounts + localStorage
│   │   ├── WishlistContext.jsx # Guest wishlist + localStorage
│   │   └── AuthContext.jsx  # Admin JWT session management
│   ├── services/
│   │   ├── api.js           # Central Axios client with interceptors
│   │   ├── mockStorage.js   # In-browser persistent mock DB
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   ├── trackingService.js
│   │   ├── returnService.js
│   │   ├── adminService.js
│   │   └── settingsService.js
│   ├── data/                # Pre-populated datasets (85 products, 12 categories, initial orders)
│   ├── config/index.js      # App configuration and storage keys
│   ├── utils/               # Formatters (formatPrice, formatDate) & Validators (Indian Mobile, PIN)
│   ├── routes/AppRoutes.jsx # Route table mapping
│   ├── styles/index.css     # Tailwind directives and produce marquee keyframes
│   ├── App.jsx              # App entry with Providers
│   └── main.jsx
├── docs/
│   ├── API_CONTRACT.md      # Backend REST contract for Spring Boot
│   ├── FRONTEND_GUIDE.md    # This file
│   └── ADMIN_GUIDE.md       # Admin panel user guide
├── .env.example
├── package.json
└── README.md
```

---

## 3. Switching from Mock to Live Spring Boot Backend

The frontend is built with a dual-mode integration layer:

1. **Development Mock Mode (Default)**:
   - In `.env`:
     ```env
     VITE_API_BASE_URL=http://localhost:8080/api
     VITE_USE_MOCK=true
     ```
   - In this mode, mock services simulate network latency, persist orders and status changes to `localStorage`, and enable 100% full functionality without running Spring Boot.

2. **Live Spring Boot Production Mode**:
   - In `.env`:
     ```env
     VITE_API_BASE_URL=http://your-production-domain.com/api
     VITE_USE_MOCK=false
     ```
   - Every service seamlessly executes real HTTP REST calls via `apiClient` (`src/services/api.js`).

---

## 4. Key Implementation Details

### Cash on Delivery (COD) Enforcement
- Online payment methods are strictly omitted.
- The checkout form validates 10-digit Indian mobile numbers (`/^[6-9]\d{9}$/`) and 6-digit PIN codes.
- `orderService.createOrder` verifies that `paymentMethod === 'Cash on Delivery'`.

### Guest Order Tracking & Returns
- Customers track their order using:
  - `Order ID` (e.g., `ORD-849102`)
  - `Mobile Number` (e.g., `9861012345`)
- Supported interactions:
  - Cancel order if order status is `Order Placed`, `Confirmed`, or `Processing`.
  - Submit individual item return requests on delivered orders without cancelling other items.

### Floating WhatsApp Support Button
- Automatically configured via `src/components/common/WhatsAppButton.jsx`.
- Controlled through centralized `storeSettings.js` / admin settings.
- Automatically hidden inside the Admin Dashboard.

