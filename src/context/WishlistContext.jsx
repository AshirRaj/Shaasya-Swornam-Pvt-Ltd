import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '../services/wishlistService';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => wishlistService.getWishlist());

  useEffect(() => {
    wishlistService.saveWishlist(items);
  }, [items]);

  const addToWishlist = (product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId) => {
    return items.some((p) => p.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setItems([]);
    wishlistService.clearWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount: items.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

