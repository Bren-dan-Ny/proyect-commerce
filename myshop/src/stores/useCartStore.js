import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const exists = get().cartItems.find((item) => item.id === product.id);
        if (exists) {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: Math.min(
                      item.quantity + (product.quantity ?? 1),
                      product.stock,
                    ),
                  }
                : item,
            ),
          }));
        } else {
          set((state) => ({
            cartItems: [
              ...state.cartItems,
              { ...product, quantity: product.quantity ?? 1 },
            ],
          }));
        }
      },

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      updateQuantity: (productId, newQuantity) => {
        const quantity = Math.max(1, Math.min(10, newQuantity));
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ cartItems: [] }),

      // Selectores útiles
      getTotalItems: () =>
        get().cartItems.reduce((acc, item) => acc + item.quantity, 0),

      getTotalPrice: () =>
        get().cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart", // misma key que tenías en localStorage
    },
  ),
);
