"use client";

import React, { useEffect, useState } from "react";
import { LocalCart } from "@/utils/global/localCart";
import API from "@/utils/interceptor/interceptor";
import { EmptyCart } from "@/components/pages/ShoppingCart/components/EmptyCart";
import { ShoppingCart } from "@/components/pages/ShoppingCart/ShoppingCart";
import { LoadingGlobal } from "@/components/global/Components/Loading/Loading";
import { CartData } from "@/types/shopping-cart";
import { useAuthStore } from "@/store/auth";

export default function CartPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true); // ⬅️ اول همیشه loading فعال بشه

      try {
        const localCartItems = LocalCart.getCart();
        const cartCount = LocalCart.getCartCount();

        if (loggedIn) {
          const res = await API.get("/protected/cart", { withCredentials: true });
          setCartData(res.data.result || null);
          setLoading(false)
        } else {
          if (cartCount > 0) {
            const res = await API.post("/products/cart", localCartItems);
            setCartData(res.data?.result || null);
          } else {
            setCartData(null);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching cart:", error);
        setCartData(null);
      } finally {
        setLoading(false); // ⬅️ فقط بعد از تموم شدن
      }
    };

    fetchCart();
  }, [loggedIn]);

  // 1️⃣ حالت لودینگ
  if (loading) {
    return <LoadingGlobal />;
  }

  // 2️⃣ حالت خالی
  if (!loading && !cartData || cartData?.total_items === 0) {
    return <EmptyCart />;
  }

  // 3️⃣ حالت دیتا موجود
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[120px] py-8 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShoppingCart data={cartData} />
      </div>
    </div>
  );
}
