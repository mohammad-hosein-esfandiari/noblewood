import { create } from "zustand";

// 🛒 تعریف تایپ استور
interface CartStore {
  count: number;
  increase: (amount?: number) => void; // اضافه کردن تعداد
  decrease: (amount?: number) => void; // کم کردن تعداد
  setCount: (value: number) => void;   // ست مستقیم تعداد
  reset: () => void;                   // ریست کردن
}

// 🛒 ساخت استور
export const useCartStore = create<CartStore>((set) => ({
  count: 0,

  increase: (amount = 1) =>
    set((state) => ({ count: state.count + amount })),

  decrease: (amount = 1) =>
    set((state) => ({
      count: Math.max(0, state.count - amount), // حداقل ۰
    })),

  setCount: (value) => set({ count: Math.max(0, value) }),

  reset: () => set({ count: 0 }),
}));
