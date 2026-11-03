# Spring Boot REST API Contract — Shaasya Swornam Pvt. Ltd.

This document serves as the authoritative API specification between the **Shaasya Swornam React Frontend** and the **Spring Boot Backend**.

---

## 1. Architectural Principles & Rules

1. **Base URL**: `http://localhost:8080/api` (configurable via `VITE_API_BASE_URL` in `.env`).
2. **Customer Registration & Customer Login**: **NONE**. The storefront operates on a guest checkout model. Customers track orders using `orderId` + `mobile`.
3. **Payment Method**: **Cash on Delivery (COD) ONLY**. No payment gateway (Razorpay/Stripe) integration exists. Orders must strictly be created with `paymentMethod = "Cash on Delivery"`.
4. **Standard Envelope**:
   - Success:
     ```json
     {
       "success": true,
       "data": { ... } | [ ... ],
       "message": "Optional human-readable confirmation message",
       "pagination": {
         "page": 1,
         "limit": 12,
         "total": 85,
         "totalPages": 8
       }
     }
     ```
   - Error:
     ```json
     {
       "success": false,
       "message": "Validation failed",
       "status": 400,
       "errors": {
         "fieldName": "Specific field validation message"
       }
     }
     ```
5. **Authentication**: Admin endpoints require JWT Bearer header:
   `Authorization: Bearer <token>`.

---

## 2. Authentication Endpoints (Admin Only)

### `POST /api/auth/login`
- **Purpose**: Authenticate store administrator.
- **Access**: Public.
- **Request Body**:
  ```json
  {
    "username": "admin@shaasya.com",
    "password": "adminPassword123"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "admin-1",
      "name": "Store Administrator",
      "email": "admin@shaasya.com",
      "role": "ADMIN"
    }
  }
  ```

---

## 3. Products Endpoints

### `GET /api/products`
- **Purpose**: Retrieve paginated product catalog with filtering, sorting, and search.
- **Query Parameters**:
  - `category` (optional, string): e.g. `plants`, `organic-dal`, `soil-fertilizer`
  - `search` (optional, string): Case-insensitive keyword matching name or description
  - `minPrice` (optional, number): Minimum unit price
  - `maxPrice` (optional, number): Maximum unit price
  - `sort` (optional, string): `popularity`, `price-asc`, `price-desc`, `rating`, `name-asc`
  - `page` (optional, int, default: `1`)
  - `limit` (optional, int, default: `12`)
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "prod-1",
        "name": "Krishna Kamal",
        "slug": "krishna-kamal",
        "category": "plants",
        "categoryName": "Plants",
        "price": 299,
        "mrp": 374,
        "discountPercent": 20,
        "rating": "4.8",
        "reviewsCount": 26,
        "image": "/img/p-3.webp",
        "images": ["/img/p-3.webp"],
        "inStock": true,
        "stock": 25,
        "sku": "SS-1001",
        "variants": ["Standard Pack", "Pack of 2"],
        "defaultVariant": "Standard Pack",
        "isFreshArrival": true,
        "isFeatured": false,
        "description": "Experience the authentic purity...",
        "features": ["100% Certified Organic and Natural"],
        "storageInstructions": "Store in a cool, dry place.",
        "shippingInfo": "Dispatched within 24-48 hours via Cash on Delivery."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 85,
      "totalPages": 8
    }
  }
  ```

### `GET /api/products/{id}`
- **Purpose**: Get single product details by ID or slug.
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": { ...productObject }
  }
  ```

### `GET /api/products/featured`
- **Purpose**: Returns top featured items for homepage.

### `GET /api/products/fresh-arrivals`
- **Purpose**: Returns fresh arrival products.

### `POST /api/products` (Admin Only)
- **Header**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Organic Toor Dal",
    "category": "organic-dals",
    "categoryName": "Organic Dals & Pulses",
    "price": 212,
    "mrp": 265,
    "stock": 40,
    "image": "/img/organic-dal.webp",
    "variants": ["500g", "1kg", "5kg"],
    "description": "Unpolished chemical-free organic dal..."
  }
  ```

### `PUT /api/products/{id}` (Admin Only)
- **Purpose**: Update existing product details, variants, price, or stock.

### `DELETE /api/products/{id}` (Admin Only)
- **Purpose**: Deactivate or remove a product from catalog.

---

## 4. Categories Endpoints

### `GET /api/categories`
- **Purpose**: List all categories with product counts and banner images.
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "plants",
        "slug": "plants",
        "name": "Plants",
        "description": "Fresh indoor, ornamental, and medicinal plants.",
        "image": "/img/p-1.webp",
        "itemCount": 8,
        "group": "Collection"
      }
    ]
  }
  ```

### `GET /api/categories/{slug}`
- **Purpose**: Get details for a specific category slug.

### `POST /api/categories` (Admin Only)
### `PUT /api/categories/{id}` (Admin Only)
### `DELETE /api/categories/{id}` (Admin Only)

---

## 5. Orders & COD Checkout Endpoints

### `POST /api/orders`
- **Purpose**: Place a new order exclusively via **Cash on Delivery**.
- **Access**: Public / Guest.
- **Request Body**:
  ```json
  {
    "customer": {
      "fullName": "Sunita Mohapatra",
      "mobile": "9861012345",
      "email": "sunita@example.com",
      "address": "Plot HIG-12, Sector 2, Shailashree Vihar",
      "city": "Bhubaneswar",
      "state": "Odisha",
      "pincode": "751021",
      "landmark": "Near Big Bazaar"
    },
    "items": [
      {
        "productId": "prod-1",
        "title": "Krishna Kamal",
        "variant": "Standard Pack",
        "price": 299,
        "quantity": 1,
        "image": "/img/p-3.webp"
      }
    ],
    "subtotal": 299,
    "discount": 0,
    "shippingFee": 49,
    "total": 348,
    "paymentMethod": "Cash on Delivery"
  }
  ```
- **Validation Rules**:
  - `paymentMethod` must strictly equal `"Cash on Delivery"`.
  - `customer.fullName`: min length 3.
  - `customer.mobile`: valid 10-digit Indian number `^[6-9]\d{9}$`.
  - `customer.pincode`: valid 6-digit Indian PIN code `^[1-9][0-9]{5}$`.
  - `items`: non-empty array with positive quantities.
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "data": {
      "id": "ORD-849102",
      "orderNumber": "ORD-849102",
      "createdAt": "2026-10-31T12:00:00.000Z",
      "total": 348,
      "paymentMethod": "Cash on Delivery",
      "paymentStatus": "Pending",
      "orderStatus": "Order Placed",
      "tracking": [
        {
          "status": "Order Placed",
          "timestamp": "2026-10-31T12:00:00.000Z",
          "notes": "Order placed successfully via Cash on Delivery."
        }
      ],
      "canCancel": true,
      "canReturn": false
    },
    "message": "Order placed successfully via Cash on Delivery"
  }
  ```

---

## 6. Guest Order Tracking & Cancellations

### `POST /api/orders/track`
- **Purpose**: Authenticate guest order lookup using Order ID and associated Mobile Number.
- **Request Body**:
  ```json
  {
    "orderId": "ORD-849102",
    "mobile": "9861012345"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "id": "ORD-849102",
      "customer": { ... },
      "items": [ ... ],
      "total": 348,
      "paymentStatus": "Pending",
      "orderStatus": "Processing",
      "tracking": [
        { "status": "Order Placed", "timestamp": "...", "notes": "..." },
        { "status": "Confirmed", "timestamp": "...", "notes": "..." },
        { "status": "Processing", "timestamp": "...", "notes": "..." }
      ],
      "canCancel": true,
      "canReturn": false
    }
  }
  ```

### `POST /api/orders/{id}/cancel`
- **Purpose**: Cancel a pending order (if `orderStatus` is in `Order Placed`, `Confirmed`, or `Processing`).
- **Request Body**:
  ```json
  {
    "reason": "Customer requested cancellation before dispatch."
  }
  ```

---

## 7. Returns & Refunds Endpoints

### `POST /api/returns/request`
- **Purpose**: Customer logs an individual item return request without altering the rest of the order.
- **Request Body**:
  ```json
  {
    "orderId": "ORD-849089",
    "productId": "prod-5",
    "variant": "1kg",
    "reason": "Damaged or defective item",
    "comments": "Outer paper bag torn during delivery."
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "message": "Return request submitted successfully. Team will verify within 24-48 hours."
  }
  ```

### `GET /api/admin/returns` (Admin Only)
- **Purpose**: Retrieve all logged return requests with status.

### `PUT /api/admin/returns/{orderId}/{productId}/status` (Admin Only)
- **Request Body**:
  ```json
  {
    "status": "Approved",
    "refundStatus": "Refund Initiated",
    "note": "Package inspected at Bhubaneswar hub. Refund credited via NEFT."
  }
  ```

---

## 8. Coupons Endpoints

### `POST /api/coupons/validate`
- **Purpose**: Validate promo code and compute discount for current cart subtotal.
- **Request Body**:
  ```json
  {
    "code": "ORGANIC10",
    "subtotal": 1200
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "code": "ORGANIC10",
      "discountAmount": 120,
      "type": "percentage",
      "discount": 10
    },
    "message": "Coupon ORGANIC10 applied successfully!"
  }
  ```

### `GET /api/admin/coupons` (Admin Only)
### `POST /api/admin/coupons` (Admin Only)
### `PUT /api/admin/coupons/{id}` (Admin Only)
### `DELETE /api/admin/coupons/{id}` (Admin Only)

---

## 9. Admin Management & Reports Endpoints

### `GET /api/admin/dashboard/stats` (Admin Only)
- Returns total orders, total revenue, unique customers, active products, pending orders, and low-stock count.

### `GET /api/admin/orders` (Admin Only)
- List all orders with filters for `status` and `search`.

### `PUT /api/admin/orders/{id}/status` (Admin Only)
- Update order lifecycle: `Order Placed` -> `Confirmed` -> `Processing` -> `Shipped` -> `Out for Delivery` -> `Delivered` -> `Cancelled`.

### `PUT /api/admin/orders/{id}/payment-status` (Admin Only)
- Update COD cash collection status: `Pending` -> `Collected` -> `Refunded`.

### `GET /api/admin/inventory` (Admin Only)
- Returns SKU list, stock quantity, and low-stock indicators.

### `PUT /api/admin/inventory/{productId}` (Admin Only)
- Updates available stock count.

### `GET /api/admin/customers` (Admin Only)
- Returns aggregated guest customer directory.

### `GET /api/admin/reports/sales` (Admin Only)
- Returns sales timeline, delivery success rates, and top-selling products.

### `GET /api/settings`
- Returns store contact info, WhatsApp number, and free delivery thresholds.

### `PUT /api/admin/settings` (Admin Only)
- Update business settings.

