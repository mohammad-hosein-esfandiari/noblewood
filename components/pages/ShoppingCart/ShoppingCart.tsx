"use client";

import { getTokenCookie, setTokenCookie } from "@/utils/other/cookie";
import { useEffect, useState } from "react";
import { Head } from "./components/Head";
import { CartItems } from "./components/CartItems";
import { OrderSummery } from "./components/OrderSummery";

interface CartItem {
  key: string;
  name: string;
  quantity: number;
  prices?: {
    price: number;
    currency_code: string;
  };
}

export default function ShoppingCart() {
  return (
    <>
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Head />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CartItems />
            <OrderSummery />
          </div>
        </div>
      </div>
    </>
  );
}
