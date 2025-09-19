import API from "@/utils/interceptor/interceptor";
import { getTokenCookie } from "@/utils/other/cookie";
import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  userId: number | null;
  loading: boolean;
  errors: string[];
  refreshAuth: (cookie : string | null) => Promise<void>;
  setLoggedOut: () => void; // ← اضافه شد
  setLoggedIn: (userId: number) => void; // ✅ متد جدید

}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  userId: null,
  loading: true,
  errors: [],

  refreshAuth: async (cookie:string |null) => {
    set({ loading: true, errors: [] });


    if (cookie) {
      try {
        const res = await API.get("/auth/verify", { withCredentials: true });
        const data = res.data;

        if (data.loggedIn) {
          set({ loggedIn: true, userId: data.userId, loading: false });
          console.log("✅ Auth verified:", data);
        } else {
          // توکن نیست یا نامعتبر، فقط لاگ بزن
          set({ loggedIn: false, userId: null, loading: false });
          console.log("ℹ️ Not logged in:", data);
        }
      } catch (err: any) {
        // هیچ اروری به کاربر نمایش داده نشه
        set({ loggedIn: false, userId: null, loading: false });
        console.log("ℹ️ Auth check failed silently:", err?.message || err);
      }
    }
  },

  setLoggedOut: () => {
    set({ loggedIn: false, userId: null, loading: false });
  },
  setLoggedIn: (userId: number) => {
    set({ loggedIn: true, userId, loading: false });
  },
}));
