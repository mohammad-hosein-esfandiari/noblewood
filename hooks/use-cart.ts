"use client";

import { useState, useEffect, useCallback } from "react";
import { getTokenCookie, setTokenCookie } from "@/utils/other/cookie";
import toast from "react-hot-toast";

interface CartItem {
  [key:string]: any;
}

interface UseCartReturn {
  cart: CartItem[];
  cartCount: number; // ✅ اضافه شد
  errors: string[];
  loading: boolean;
  refreshCart: () => Promise<void>;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCartTokenAndItems = useCallback(async () => {
    try {
      setLoading(true);

      let cartToken = getTokenCookie("NW-CART");

      if (!cartToken) {
        const tokenRes = await fetch("/api/routes/cart/cart-token", {
          method: "GET",
          credentials: "include",
        });

        const tokenData = await tokenRes.json();

        if (tokenData) {
          setTokenCookie("NW-CART", tokenData, true);
          cartToken = tokenData;
          toast.success("Cart token created ✅");
        } else {
          toast.error("No cart token found ⚠️");
        }
      }

      if (!cartToken) {
        setErrors((prev) => [...prev, "Cart token not found"]);
        return;
      }

      const cartRes = await fetch("/api/routes/cart", {
        method: "GET",
        headers: {
          "X-Cart-Token": cartToken,
        },
        credentials: "include",
      });

      const cartData = await cartRes.json();

      if (cartRes.ok) {
        setCart(cartData?.result || []);
      } else {
        const msg = "Failed to fetch cart items ❌";
        toast.error(msg);
        setErrors((prev) => [...prev, msg]);
      }
    } catch (err: any) {
      const msg = err.message || "Unexpected error ❌";
      toast.error(msg);
      setErrors((prev) => [...prev, msg]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartTokenAndItems();
  }, [fetchCartTokenAndItems]);

  // ✅ تعداد کل آیتم‌ها (جمع quantity ها)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    cartCount,
    errors,
    loading,
    refreshCart: fetchCartTokenAndItems,
  };
}
