"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import API from "@/utils/interceptor/interceptor";
import { LocalCart } from "@/utils/global/localCart";

const AuthInitializer: React.FC = () => {
  const refreshAuth = useAuthStore((state) => state.refreshAuth);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  // 1️⃣ وقتی کامپوننت لود شد → auth چک بشه
  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  // 2️⃣ وقتی وضعیت لاگین تغییر کرد → درخواست مرج کارت بزن
  useEffect(() => {
    if (loggedIn) {
      const mergeCart = async () => {
        try {
          // گرفتن آیتم‌های محلی
          const localCartItems = LocalCart.getCart(); 

          const res = await API.post(
            "/protected/cart/merge",
            { cart_items: localCartItems }, // 👈 اینجا body
            { withCredentials: true } // 👈 اینجا تنظیمات
          );

          console.log("🛒 Cart merge response:", res.data);
        } catch (err) {
          console.error("❌ Error merging cart:", err);
        }
      };

      mergeCart();
    }
  }, [loggedIn]);

  return null; // فقط برای initialize
};

export default AuthInitializer;
