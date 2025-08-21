import { Minus, Plus } from 'lucide-react'
import React, { FC } from 'react'

interface QuantityProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}



export const Quantity:FC<QuantityProps> = ({quantity, setQuantity}) => {
    const handleQuantityChange = (change: number) => {
        setQuantity(quantity + change);
      };
  return (
    <div className="mb-8">
    <label className="block text-md font-semibold text-gray-800 mb-4">
      Quantity
    </label>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleQuantityChange(-1)}
        disabled={quantity <= 1}
        className="w-9 h-9 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-amber-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-20 text-center text-md font-bold bg-gray-50 py-2 rounded-xl">
        {quantity}
      </span>
      <button
        onClick={() => handleQuantityChange(1)}
        disabled={quantity >= 5}
        className="w-9 h-9 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-amber-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
  )
}
