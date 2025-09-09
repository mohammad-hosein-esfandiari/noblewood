// src/utils/auth/logout.ts
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import API from "@/utils/interceptor/interceptor";
import { LocalCart } from "../global/localCart";

export const logout = async () => {
  try {
    // 1️⃣ درخواست لاگ‌اوت سمت سرور برای حذف کوکی HttpOnly
    await API.post("/auth/logout");

    // 2️⃣ بروزرسانی استور auth
    const { setLoggedOut } = useAuthStore.getState();
    setLoggedOut();
    const {reset} = useCartStore.getState();
    reset()
    LocalCart.clearCart()

    console.log("✅ User logged out successfully");
  } catch (err: any) {
    console.error("⚠️ Logout failed:", err?.message || err);
    // حتی اگر سرور fail کرد، استور رو reset کن
    useAuthStore.getState().setLoggedOut();
  }
};
