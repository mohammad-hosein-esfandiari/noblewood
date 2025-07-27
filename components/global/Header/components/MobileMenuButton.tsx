import { Menu, X } from 'lucide-react'
import React, { FC } from 'react'
import { HeaderProps, MobileMenuButtonProps } from '../Header';



export const MobileMenuButton:FC<MobileMenuButtonProps> = ({isMenuOpen,isScrolled,setIsMenuOpen}) => {
  return (
    <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className={`md:hidden p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
      isScrolled
        ? "text-amber-900 hover:text-amber-700 hover:bg-amber-100/20"
        : "text-white hover:text-amber-200 hover:bg-white/10"
    }`}>
    {isMenuOpen ? (
      <X className="w-6 h-6" />
    ) : (
      <Menu className="w-6 h-6" />
    )}
  </button>
  )
}
