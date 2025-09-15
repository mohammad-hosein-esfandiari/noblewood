"use client";

import React, { useEffect, useState } from "react";
import { LocalCart } from "@/utils/global/localCart";
import API from "@/utils/interceptor/interceptor";
import { EmptyCart } from "@/components/pages/ShoppingCart/components/EmptyCart";
import { ShoppingCart } from "@/components/pages/ShoppingCart/ShoppingCart";
import { LoadingGlobal } from "@/components/global/Components/Loading/Loading";
import { CartData, LocalCartItem } from "@/types/shopping-cart";

export default function CartPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cartData, setCartData] = useState<CartData | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const localCartItems = LocalCart.getCart();
      const cartCount = LocalCart.getCartCount();
      if (cartCount > 0) {
        try {
          const res = await API.post("/products/cart", localCartItems);
          setCartData(res.data?.result || null);
        } catch (error) {
          console.error("❌ Error fetching cart:", error);
          setCartData(null); // fallback به کارت محلی
        }
      } else {
        setCartData(null);
      }

      setLoading(false);
    };

    fetchCart();
  }, []);

  if (loading) {
    return <LoadingGlobal/>;
  }

  if (cartData?.total_items === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[120px] py-8 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShoppingCart data={cartData} />
      </div>
    </div>
  );
}
