export const INITIAL_ORDERS = [
  {
    id: 'ORD-849102',
    orderNumber: 'ORD-849102',
    createdAt: '2026-10-30T10:15:00.000Z',
    customer: {
      fullName: 'Sunita Mohapatra',
      mobile: '9861012345',
      email: 'sunita.m@example.com',
      address: 'House No. 45, Forest Park',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751009',
      landmark: 'Near Forest Club'
    },
    items: [
      {
        productId: 'prod-1',
        title: 'Krishna Kamal',
        variant: 'Standard Pack',
        price: 299,
        quantity: 1,
        image: '/img/p-3.webp',
        returnRequested: false,
        returnStatus: null
      },
      {
        productId: 'prod-2',
        title: 'Plastic Planter',
        variant: 'Medium (8 inch)',
        price: 659,
        quantity: 2,
        image: '/img/pl-6.webp',
        returnRequested: false,
        returnStatus: null
      }
    ],
    subtotal: 1617,
    discount: 50,
    shippingFee: 0,
    total: 1567,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending', // Pending, Collected, Refunded
    orderStatus: 'Processing', // Order Placed, Confirmed, Processing, Shipped, Out for Delivery, Delivered, Cancelled
    tracking: [
      { status: 'Order Placed', timestamp: '2026-10-30T10:15:00.000Z', notes: 'Order placed via Cash on Delivery' },
      { status: 'Confirmed', timestamp: '2026-10-30T11:00:00.000Z', notes: 'Order verified and confirmed by Shaasya Swornam team' },
      { status: 'Processing', timestamp: '2026-10-30T14:30:00.000Z', notes: 'Items packed in eco-friendly packaging and prepared for dispatch' }
    ],
    canCancel: true,
    canReturn: false
  },
  {
    id: 'ORD-849089',
    orderNumber: 'ORD-849089',
    createdAt: '2026-10-28T09:20:00.000Z',
    customer: {
      fullName: 'Ramesh Chandra Jena',
      mobile: '9437023456',
      email: 'ramesh.jena@example.com',
      address: 'Plot 312, Saheed Nagar',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751007',
      landmark: 'Opposite State Bank ATM'
    },
    items: [
      {
        productId: 'prod-5',
        title: 'Tata Sampann Organic Toor /Arhar Dal',
        variant: '1kg',
        price: 212,
        quantity: 2,
        image: '/img/organic-dal.webp',
        returnRequested: false,
        returnStatus: null
      },
      {
        productId: 'prod-8',
        title: '24 Mantra Organic Moong Dal',
        variant: '1kg',
        price: 158,
        quantity: 1,
        image: '/img/organic-dal4.webp',
        returnRequested: false,
        returnStatus: null
      }
    ],
    subtotal: 582,
    discount: 0,
    shippingFee: 0,
    total: 582,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Collected',
    orderStatus: 'Delivered',
    tracking: [
      { status: 'Order Placed', timestamp: '2026-10-28T09:20:00.000Z', notes: 'Order placed via Cash on Delivery' },
      { status: 'Confirmed', timestamp: '2026-10-28T10:00:00.000Z', notes: 'Order confirmed' },
      { status: 'Processing', timestamp: '2026-10-28T14:00:00.000Z', notes: 'Packed and ready' },
      { status: 'Shipped', timestamp: '2026-10-29T08:30:00.000Z', notes: 'Shipped via Express Local Delivery' },
      { status: 'Out for Delivery', timestamp: '2026-10-29T11:00:00.000Z', notes: 'Courier agent out for delivery' },
      { status: 'Delivered', timestamp: '2026-10-29T15:45:00.000Z', notes: 'Delivered safely and COD payment of Rs. 582 collected in cash.' }
    ],
    canCancel: false,
    canReturn: true
  },
  {
    id: 'ORD-849045',
    orderNumber: 'ORD-849045',
    createdAt: '2026-10-29T16:40:00.000Z',
    customer: {
      fullName: 'Pooja Patnaik',
      mobile: '9853123789',
      email: 'pooja.p@example.com',
      address: 'Flat 402, Royal Residency, Patia',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751024',
      landmark: 'Near KIIT Square'
    },
    items: [
      {
        productId: 'prod-12',
        title: 'Elly Nuts 100% Natural and Premium Healthy Mix Dry Fruits and Nuts',
        variant: '500g',
        price: 499,
        quantity: 1,
        image: '/img/elly.jpg',
        returnRequested: true,
        returnStatus: 'Pending',
        returnReason: 'Damaged outer seal on arrival'
      }
    ],
    subtotal: 499,
    discount: 0,
    shippingFee: 49,
    total: 548,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Collected',
    orderStatus: 'Delivered',
    tracking: [
      { status: 'Order Placed', timestamp: '2026-10-29T16:40:00.000Z', notes: 'Order placed' },
      { status: 'Confirmed', timestamp: '2026-10-29T17:15:00.000Z', notes: 'Confirmed' },
      { status: 'Processing', timestamp: '2026-10-30T09:00:00.000Z', notes: 'Packed' },
      { status: 'Shipped', timestamp: '2026-10-30T13:00:00.000Z', notes: 'Shipped' },
      { status: 'Out for Delivery', timestamp: '2026-10-31T09:30:00.000Z', notes: 'Out for delivery' },
      { status: 'Delivered', timestamp: '2026-10-31T11:20:00.000Z', notes: 'Delivered and COD collected' }
    ],
    canCancel: false,
    canReturn: true
  }
];

