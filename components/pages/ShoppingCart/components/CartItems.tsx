import Loading from "@/app/products/[slug]/loading";
import { CartObjectAPI } from "@/types/shopping-cart";

import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { FC, useState } from "react";

interface CartItemsProps {
  cart: CartObjectAPI[];
}

export const CartItems: FC<CartItemsProps> = ({ cart }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between gap-2 flex-wrap border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Choosed Products
          </h2>
          <button className="text-sm text-gray-400 flex items-center gap-2 underline">
            <span className="font-semibold">Clear Cart</span>
          </button>
        </div>
        <div className="divide-y divide-gray-200 relative">
          {isLoading ? (
            <div className="absolute left-0 top-0 w-full h-full backdrop-blur-sm z-10"></div>
          ) : null}

          {cart.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-center  space-x-4 rtl:space-x-reverse">
                {/* Replace with Next.js <Image /> if needed */}
                <div className="bg-gray-50 rounded-lg w-24 h-24">
                  <Image
                    src={item.image_url}
                    alt={item.product_name}
                    height={24}
                    width={24}
                    priority
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.product_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">category</p>
                  <p className="text-xl font-bold text-amber-700">
                    {item.price}$
                  </p>
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
