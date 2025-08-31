import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  userId: number | null;
  loading: boolean;
  errors: string[];
  refreshAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  userId: null,
  loading: true,
  errors: [],

  refreshAuth: async () => {
    set({ loading: true, errors: [] });

    try {
      const res = await fetch("/api/routes/auth/verify", { credentials: "include" });
      const data = await res.json();

      if (data.loggedIn) {
        set({ loggedIn: true, userId: data.userId, loading: false });
      } else {
        set({ loggedIn: false, userId: null, loading: false });
      }
    } catch (err: any) {
      set({ loggedIn: false, userId: null, loading: false, errors: [err.message] });
    }
  },
}));
