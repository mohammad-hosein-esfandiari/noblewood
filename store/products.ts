import { RawProduct } from "@/types/product";
import API from "@/utils/interceptor/interceptor";
import { create } from "zustand";

export interface FilterQueries {
  category: string;
  brand: string;
  min_price: string;
  max_price: string;
  search?: string;
}

interface ProductStore {
  products: RawProduct[];
  queries: FilterQueries;
  loading: boolean;
  setQuery: (key: keyof FilterQueries, value: string) => void;
  resetQueries: (key?: keyof FilterQueries) => void;
  fetchProducts: () => Promise<void>;
  setProducts: (products: RawProduct[]) => void;
}

let fetchTimeout: NodeJS.Timeout | null = null;

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  queries: {
    category: "",
    brand: "",
    min_price: "",
    max_price: "",
    search: "",
  },
  loading: false,

  setQuery: (key, value) => {
    set((state) => ({
      queries: { ...state.queries, [key.toLowerCase()]: value },
    }));

    if (fetchTimeout) clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
      get().fetchProducts();
    }, 400);
  },

  setProducts: (products: RawProduct[]) => set({ products }),

  resetQueries: (key) => {
    if (key) {
      set((state) => ({
        queries: {
          ...state.queries,
          [key]: "",
        },
      }));
    } else {
      set({
        queries: {
          category: "",
          brand: "",
          min_price: "",
          max_price: "",
          search: "",
        },
      });
    }

    if (fetchTimeout) clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
      get().fetchProducts();
    }, 400);
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { queries } = get();

      const queryString = Object.entries(queries)
        .filter(([_, value]) => value !== "")
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      const data = await API(`/products${queryString ? `?${queryString}` : ""}`);
      get().setProducts(data?.data.result || []);
      set({ products: data?.data.result || [] });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
