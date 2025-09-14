import ShoppingCart from "@/components/pages/ShoppingCart/ShoppingCart";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="pt-[120px] py-8  max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8 ">
        <ShoppingCart />
      </div>
    </div>
  );
}
