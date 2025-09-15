import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

export const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-600 mb-8">
          You havent added any products to your cart yet. Check out our beautiful products.
        </p>
        <Link
          href="/"
          className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2 rtl:space-x-reverse"
        >
          <ShoppingBag className="w-6 h-6" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};
