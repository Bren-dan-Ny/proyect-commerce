import { create } from "zustand";
import { getProducts, getProductsByCategory } from "../services/productsApi";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async (category = null) => {
    set({ loading: true, error: null });
    try {
      const data = category
        ? await getProductsByCategory(category)
        : await getProducts();
      set({ products: data.products || [] });
    } catch (error) {
      set({ error: error.message || "Error al cargar productos" });
    } finally {
      set({ loading: false });
    }
  },

  clearProducts: () => set({ products: [] }),
}));
