"use client";

import { getTokenCookie, setTokenCookie } from "@/utils/other/cookie";
import { useEffect, useState } from "react";
import { Head } from "./components/Head";

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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchCartTokenAndItems = async () => {
      try {
        // 1️⃣ Get the cart token from cookies
        let cartToken = getTokenCookie("NW-CART");

        // 2️⃣ If no token found → request a new token from API
        if (!cartToken) {
          const tokenRes = await fetch("/api/routes/cart/cart-token", {
            method: "GET",
            credentials: "include", // include cookies in the request
          });

          const tokenData = await tokenRes.json();
          console.log("📥 /cart-token response:", tokenData);

          if (tokenData) {
            // Save the token in cookies for future requests
            setTokenCookie("NW-CART", tokenData);
            console.log("✅ Cart token set in cookie:", tokenData);
            cartToken = tokenData;
          } else {
            console.warn("⚠️ No token found in response");
          }
        }

        // 3️⃣ If still no token → stop and set error
        if (!cartToken) {
          setErrors((prev) => [...prev, "Cart token not found"]);
          return;
        }

        // 4️⃣ Fetch cart items using the stored token
        const cartRes = await fetch("/api/routes/cart", {
          method: "GET",
          headers: {
            "X-Cart-Token": cartToken, // pass the token as a custom header
          },
          credentials: "include",
        });

        const cartData = await cartRes.json();
        console.log("📥 /cart response:", cartData);

        if (cartRes.ok) {
          // Save the cart items to state
          setCart(cartData?.result || []);
        } else {
          setErrors((prev) => [...prev, "Failed to fetch cart items"]);
        }
      } catch (err: any) {
        console.error("❌ Error fetching cart token or items:", err);
        setErrors((prev) => [...prev, err.message || "Unexpected error"]);
      }
    };

    // Run on component mount
    fetchCartTokenAndItems();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Head/>
        </div>
        
      </div>

      <div>
        {/* Show error messages if any */}
        {errors.length > 0 &&
          errors.map((errorMsg, index) => (
            <p key={index} className="text-red-600">
              {errorMsg}
            </p>
          ))}

        {/* Show cart items if available, otherwise show empty message */}
        {cart.length > 0 ? (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={item.key}
                className="border rounded-md p-3 shadow-sm bg-white">
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Price: {(item.prices?.price ?? 0) / 100}{" "}
                  {item.prices?.currency_code ?? ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          errors.length === 0 && <p>Your cart is empty.</p>
        )}
      </div>
    </>
  );
}
