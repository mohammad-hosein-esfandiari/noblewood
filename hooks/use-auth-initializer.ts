"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import API from "@/utils/interceptor/interceptor";

const AuthInitializer: React.FC = () => {
  const refreshAuth = useAuthStore((state) => state.refreshAuth);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  // 1️⃣ وقتی کامپوننت لود شد → auth چک بشه
  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  // 2️⃣ وقتی وضعیت لاگین تغییر کرد → درخواست کارت بزن
  useEffect(() => {
    if (loggedIn) {
      const fetchCart = async () => {
        try {
          const res = await API.get("/protected/cart", { withCredentials: true });
          console.log("🛒 Cart response:", res.data);
        } catch (err) {
          console.error("❌ Error fetching cart:", err);
        }
      };

      fetchCart();
    }
  }, [loggedIn]);

  return null; // فقط برای initialize
};

export default AuthInitializer;
