import Link from "next/link";
import React, { FC } from "react";
interface OrderSummeryProps {
  price:number;

}

export const OrderSummery:FC<OrderSummeryProps> = ({price}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Order Summary
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Items Price</span>
            <span className="font-medium">${price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Cost</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-amber-700">
                {/* {formatPrice(state.total)} */}
                ${price}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/checkout"
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center block">
            Proceed to Checkout
          </Link>

          <Link
            href="/"
            className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-gray-400 transition-colors duration-200 text-center block">
            Continue Shopping
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Free shipping on orders over $1000
          </p>
        </div>
      </div>
    </div>
  );
};
