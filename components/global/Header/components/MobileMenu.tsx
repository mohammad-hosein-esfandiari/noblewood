import React, { FC } from 'react'
import { MobileMenuButtonProps } from '../Header'
import Link from 'next/link'

export const MobileMenu:FC<MobileMenuButtonProps> = ({isMenuOpen,isScrolled,setIsMenuOpen}) => {
  return (
    <div
    className={`md:hidden transition-all duration-500 overflow-hidden ${
      isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
    }`}>
    <div
      className={`py-4 space-y-2 ${
        isScrolled ? "bg-amber-50" : "bg-white/95"
      } backdrop-blur-lg rounded-2xl mt-4 shadow-xl border ${
        isScrolled ? "border-amber-200" : "border-amber-100"
      }`}>
      {[
        { href: "/", label: "Home" },
        { href: "#products", label: "Products" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
        { href: "/login", label: "Login" },
      ].map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block px-6 py-3 transition-all duration-300 font-medium ${
            isScrolled
              ? "text-amber-900 hover:text-amber-700 hover:bg-amber-100"
              : "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
          }`}
          onClick={() => setIsMenuOpen(false)}
          style={{ animationDelay: `${index * 100}ms` }}>
          {item.label}
        </Link>
      ))}
    </div>
  </div>
  )
}
