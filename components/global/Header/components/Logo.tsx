import {  TreePine } from 'lucide-react'
import Link from 'next/link'
import React, { FC } from 'react'
import { HeaderProps } from '../Header'



export const Logo:FC<HeaderProps> = ({isScrolled}) => {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
    <div className="relative">
      <div
        className={`w-12 h-12 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
        <TreePine className="w-7 h-7 text-white" />
      </div>
      <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </div>
    <div className="flex flex-col">
      <span
        className={`text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent transition-all duration-300 ${
          isScrolled
            ? "text-amber-900 bg-none !text-amber-900 !bg-none"
            : ""
        }`}>
        NobleWood
      </span>
      <span
        className={`text-xs font-medium transition-all duration-300 ${
          isScrolled ? "text-amber-700" : "text-amber-100"
        }`}>
        Crafted Excellence
      </span>
    </div>
  </Link>
  )
}
