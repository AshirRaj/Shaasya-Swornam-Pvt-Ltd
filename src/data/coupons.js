export const INITIAL_COUPONS = [
  {
    id: 'cpn-1',
    code: 'ORGANIC10',
    type: 'percentage', // percentage or fixed
    discount: 10,
    minOrderValue: 499,
    maxDiscount: 200,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    usedCount: 84,
    status: 'ACTIVE',
    description: 'Get 10% off on orders above Rs. 499 (Max Rs. 200)'
  },
  {
    id: 'cpn-2',
    code: 'NATURE50',
    type: 'fixed',
    discount: 50,
    minOrderValue: 699,
    maxDiscount: 50,
    expiryDate: '2026-11-30',
    usageLimit: 300,
    usedCount: 42,
    status: 'ACTIVE',
    description: 'Flat Rs. 50 off on fresh organic produce above Rs. 699'
  },
  {
    id: 'cpn-3',
    code: 'WELCOME15',
    type: 'percentage',
    discount: 15,
    minOrderValue: 999,
    maxDiscount: 300,
    expiryDate: '2027-01-31',
    usageLimit: 1000,
    usedCount: 310,
    status: 'ACTIVE',
    description: 'Special 15% discount on orders above Rs. 999'
  }
];

