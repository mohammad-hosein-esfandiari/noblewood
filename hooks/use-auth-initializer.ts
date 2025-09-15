"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import API from "@/utils/interceptor/interceptor";
import { LocalCart } from "@/utils/global/localCart";

/**
 * AuthInitializer component
 * - Checks user authentication on page load.
 * - Handles merging the local cart with the server cart if logged in.
 * - Fetches local cart data if the user is not logged in.
 */
const AuthInitializer: React.FC = () => {
  const refreshAuth = useAuthStore((state) => state.refreshAuth);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  // 1️⃣ Check authentication when component mounts
  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  // 2️⃣ Handle cart based on login status
  useEffect(() => {
    const handleCart = async () => {
      try {
        if (loggedIn) {
          // ✅ Logged-in user
          const localCartItems = LocalCart.getCart(); // Get local cart items
          let res;

          if (localCartItems.length > 0) {
            // Merge local cart with server cart
            res = await API.post(
              "/protected/cart/merge",
              { cart_items: localCartItems },
              { withCredentials: true }
            );
          } else {
            // Fetch server cart if local cart is empty
            res = await API.get("/protected/cart", { withCredentials: true });
          }

          console.log("🛒 Cart response:", res.data);
        } 
      } catch (error) {
        console.error("❌ Error handling cart:", error);
      }
    };

    void handleCart();
  }, [loggedIn]);

  return null; // Only for initialization
};

export default AuthInitializer;
