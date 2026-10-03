import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find((item) => item.id === product.id);

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...previousCart, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (!Number.isFinite(qty)) return;

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, Math.floor(qty)) } : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) => previousCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      totalQty,
      subtotal,
    }),
    [cart, totalQty, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider.");
  }
  return context;
}
