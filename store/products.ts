import { RawProduct } from "@/types/product";
import API from "@/utils/interceptor/interceptor";
import toast from "react-hot-toast";
import { create } from "zustand";

export interface FilterQueries {
  category: string;
  brand: string;
  min_price: string;
  max_price: string;
  search: string;
  stock_status: "instock" | "outofstock" | "";
  page: string; // اضافه شده برای صفحه‌بندی
}

export interface MetaData {
  total_products: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

interface ProductStore {
  products: RawProduct[];
  queries: FilterQueries;
  meta: MetaData;
  loading: boolean;
  isInitialized: boolean;

  setQuery: (key: keyof FilterQueries, value: string) => void;
  resetQueries: (key?: keyof FilterQueries) => void;
  fetchProducts: () => Promise<void>;
  setProducts: (products: RawProduct[]) => void;
  setMeta: (meta: MetaData) => void;
  setPage: (page: number) => void;
}

let fetchTimeout: NodeJS.Timeout | null = null;

const activeFilterKeys: (keyof FilterQueries)[] = [
  "category",
  "brand",
  "min_price",
  "max_price",
  "search",
  "stock_status",
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  queries: {
    category: "",
    brand: "",
    min_price: "",
    max_price: "",
    search: "",
    stock_status: "",
    page: "1",
  },
  meta: {
    total_products: 0,
    total_pages: 0,
    current_page: 1,
    per_page: 10,
  },
  isInitialized: false,
  loading: false,

  setPage: (page: number) => {
    set((state) => ({
      queries: { ...state.queries, page: page.toString() },
    }));
    get().fetchProducts();
  },

  setQuery: (key, value) => {
    set((state) => {
      const newQueries = { ...state.queries, [key]: value };

      // اگر کلید جزو فیلترهای فعال بود صفحه را 1 کن
      if (activeFilterKeys.includes(key)) {
        newQueries.page = "1";
      }

      return { queries: newQueries };
    });

    if (fetchTimeout) clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
      get().fetchProducts();
    }, 400);
  },

  setProducts: (products: RawProduct[]) =>
    set({ products, isInitialized: true }),

  setMeta: (meta: MetaData) => set({ meta }),

  resetQueries: (key) => {
    set((state) => {
      const defaultQueries: FilterQueries = {
        category: "",
        brand: "",
        min_price: "",
        max_price: "",
        search: "",
        stock_status: "",
        page: "1",
      };

      if (key) {
        return {
          queries: {
            ...state.queries,
            [key]: "",
            // اگر کلید یکی از فیلترهای فعال بود، صفحه را ریست کن
            page: activeFilterKeys.includes(key) ? "1" : state.queries.page,
          },
        };
      } else {
        return {
          queries: defaultQueries,
        };
      }
    });

    if (fetchTimeout) clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
      get().fetchProducts();
    }, 400);
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { queries } = get();

      // فقط فیلترهای غیر خالی را وارد کن
      const queryString = Object.entries(queries)
        .filter(([_, value]) => value !== "")
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      const url = `/products${queryString ? `?${queryString}` : ""}`;

      const res = await API(url);
      if (!res || res.status !== 200 || !res.data?.result) {
        toast.error("Failed to fetch products.");
        set({ loading: false });
        return;
      }

      const products = res?.data.result || [];
      const meta: MetaData = {
        total_products: Number(res?.data.total_products) || 0,
        total_pages: Number(res?.data.total_pages) || 0,
        current_page: Number(res?.data.current_page) || 1,
        per_page: Number(res?.data.per_page) || 0,
      };

      set({ products, isInitialized: true });
      get().setMeta(meta);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products",{position:"bottom-center",duration:Infinity})
    } finally {
      set({ loading: false });
    }
  },
}));
