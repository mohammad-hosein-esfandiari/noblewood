import Link from 'next/link'
import React, { FC } from 'react'
import { HeaderProps } from '../Header'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface CartButtonProps extends HeaderProps {
  cartCount : number
}



export const CartButton:FC<CartButtonProps > = ({isScrolled ,cartCount}) => {
     
  return (
    <Link
    href="/cart2"
    className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 group ${
      isScrolled
        ? "text-amber-900 hover:text-amber-700 hover:bg-amber-100/20"
        : "text-white hover:text-amber-200 hover:bg-white/10"
    }`}>
    <ShoppingCart
      className={`w-6 h-6 ${isScrolled ? "text-amber-900" : ""}`}
    />
    {cartCount> 0 && (
      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
        {cartCount}
      </span>
    )}
    <div
      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
  </Link>
  )
}
