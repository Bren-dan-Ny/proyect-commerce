import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        const exists = get().favorites.some((item) => item.id === product.id);
        set((state) => ({
          favorites: exists
            ? state.favorites.filter((item) => item.id !== product.id)
            : [...state.favorites, product],
        }));
      },

      isFavorite: (id) => get().favorites.some((item) => item.id === id),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites", // misma key que tenías, no pierdes datos
    },
  ),
);
