"use client";

import { getTokenCookie, setTokenCookie } from "@/utils/other/cookie";
import { useEffect, useState } from "react";

interface CartItem {
  key: string;
  name: string;
  quantity: number;
  prices?: {
    price: number;
    currency_code: string;
  };
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

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
            setTokenCookie("NW-CART", tokenData, true);
            console.log("✅ Cart token set in cookie:", tokenData);
            cartToken = tokenData;
          } else {
            console.warn("⚠️ No token found in response");
          }
        }

        if (!cartToken) {
          setErrors((prev) => [...prev, "Cart token not found"]);
          return;
        }

        // 3️⃣ گرفتن آیتم‌های سبد خرید با توکن ذخیره شده
        const cartRes = await fetch("/api/routes/cart", {
          method: "GET",
          headers: {
            "X-Cart-Token": cartToken, // فرستادن توکن در هدر
          },
          credentials: "include",
        });

        const cartData = await cartRes.json();
        console.log("📥 /cart response:", cartData);

        if (cartRes.ok) {
          setCart(cartData?.items || []);
        } else {
          setErrors((prev) => [...prev, "Failed to fetch cart items"]);
        }
      } catch (err: any) {
        console.error("❌ Error fetching cart token or items:", err);
        setErrors((prev) => [...prev, err.message || "Unexpected error"]);
      }
    };

    fetchCartTokenAndItems();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🛒 Cart Items</h1>

      {errors.length > 0 &&
        errors.map((errorMsg, index) => <p key={index} className="text-red-600">{errorMsg}</p>)}

      {cart.length > 0 ? (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.key} className="border rounded-md p-3 shadow-sm bg-white">
              <p><strong>{item.name}</strong></p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {(item.prices?.price ?? 0) / 100} {item.prices?.currency_code ?? ""}</p>
            </li>
          ))}
        </ul>
      ) : (
        errors.length === 0 && <p>Your cart is empty.</p>
      )}
    </div>
  );
}
