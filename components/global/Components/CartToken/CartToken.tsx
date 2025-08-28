"use client";

import { getTokenCookie, setTokenCookie } from "@/utils/other/cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartItem {
  key: string;
  name: string;
  quantity: number;
  prices?: {
    price: number;
    currency_code: string;
  };
}

export default function CartToken() {

  useEffect(() => {
    const fetchCartTokenAndItems = async () => {
      try {

        // 1️⃣ خواندن توکن از کوکی
        let cartToken = getTokenCookie("NW-CART");

        // 2️⃣ اگر توکن نبود -> گرفتن توکن از API
        if (!cartToken) {
          const tokenRes = await fetch("/api/routes/cart/cart-token", {
            method: "GET",
            credentials: "include",
          });

          const tokenData = await tokenRes.json();
          console.log("📥 /cart-token response:", tokenData);

          if (tokenData) {
            setTokenCookie("NW-CART", tokenData);
            console.log("✅ Cart token set in cookie:", tokenData);
            cartToken = tokenData;
          } else {
            toast.error(" ⚠️ No token found in response")
            console.warn("⚠️ No token found in response");
          }
        }

        if (!cartToken) {
            toast.error( "Missing cart token...")
          return;
        }

        // 3️⃣ گرفتن آیتم‌های سبد خرید با توکن ذخیره شده
        const cartRes = await fetch("/api/routes/cart", {
          method: "GET",
          headers: {
            "X-Cart-Token": cartToken,
          },
          credentials: "include",
        });

        const cartData = await cartRes.json();
        console.log("📥 /cart response:", cartData);

      } catch (err: any) {
        console.error("❌ Error fetching cart token or items:", err);
        toast.error("❌ Error fetching cart token or items")
      } finally {
        
      }
    };

    fetchCartTokenAndItems();
  }, []);

  return (
    <>

    </>
  );
}
