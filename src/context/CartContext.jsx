// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  console.log("CartProvider is rendering...");
  const [cartItems, setCartItems] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✨ MODIFIED addToCart FUNCTION
  const addToCart = (item) => {
    setCartItems(prevItems => {
      // --- Handle Standard Products ---
      // If the item is NOT custom, check if a similar item already exists.
      if (!item.customization) {
        const existingItem = prevItems.find(
          cartItem => 
            !cartItem.customization && // Make sure we only check against other standard items
            cartItem.id === item.id && 
            cartItem.size === item.size && 
            cartItem.color === item.color
        );

        // If it exists, just update the quantity
        if (existingItem) {
          return prevItems.map(cartItem =>
            cartItem.cartId === existingItem.cartId
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        }
      }

      // --- Handle Custom Items & New Standard Items ---
      // If the item IS custom OR it's a new standard item, add it to the cart.
      // We use the ID from Artpage (cartItemId) or generate a new one.
      return [...prevItems, { ...item, cartId: item.cartItemId || Date.now() }];
    });

    // --- Popup logic (no changes needed) ---
    setLastAddedItem(item);
    setShowCartPopup(true);
    setTimeout(() => {
      setShowCartPopup(false);
    }, 3000);
  };

  const removeFromCart = (cartId) => {
    // In Artpage, we called it 'cartItemId'. Your code calls it 'cartId'.
    // This handles both cases to be safe.
    setCartItems(prevItems => prevItems.filter(item => (item.cartId !== cartId && item.cartItemId !== cartId) ));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.cartId === cartId || item.cartItemId === cartId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const hideCartPopup = () => {
    setShowCartPopup(false);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    showCartPopup,
    lastAddedItem,
    hideCartPopup
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};