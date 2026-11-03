import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { couponService } from '../services/couponService';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => cartService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Sync to local storage
  useEffect(() => {
    cartService.saveCart(items);
  }, [items]);

  // Recalculate coupon discount if items change
  useEffect(() => {
    if (appliedCoupon && items.length > 0) {
      const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
      couponService
        .validateCoupon(appliedCoupon.code, subtotal)
        .then((res) => {
          setDiscountAmount(res.data.discountAmount);
        })
        .catch(() => {
          // If subtotal drops below coupon minimum, remove coupon
          setAppliedCoupon(null);
          setDiscountAmount(0);
        });
    } else if (items.length === 0) {
      setAppliedCoupon(null);
      setDiscountAmount(0);
    }
  }, [items, appliedCoupon]);

  const addItem = (product, variant = null, quantity = 1) => {
    const selectedVariant = variant || product.defaultVariant || product.variants?.[0] || 'Standard';
    const cleanQty = Math.max(1, parseInt(quantity, 10) || 1);
    const cartItemId = `${product.id}-${selectedVariant}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        // Prevent exceeding available stock
        const currentQty = prevItems[existingIndex].quantity;
        const maxStock = product.stock || 50;
        const newQty = Math.min(currentQty + cleanQty, maxStock);

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            title: product.name,
            price: product.price,
            mrp: product.mrp,
            image: product.image,
            category: product.category,
            categoryName: product.categoryName,
            variant: selectedVariant,
            quantity: Math.min(cleanQty, product.stock || 50),
            stock: product.stock
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (qty <= 0) {
      removeItem(cartItemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const maxStock = item.stock || 50;
          return { ...item, quantity: Math.min(qty, maxStock) };
        }
        return item;
      })
    );
  };

  const removeItem = (cartItemId) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
    cartService.clearCart();
  };

  const applyCouponCode = async (code) => {
    const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const result = await couponService.validateCoupon(code, subtotal);
    setAppliedCoupon(result.data);
    setDiscountAmount(result.data.discountAmount);
    return result;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const totals = cartService.calculateTotals(items, discountAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        appliedCoupon,
        discountAmount,
        applyCouponCode,
        removeCoupon,
        totals
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

