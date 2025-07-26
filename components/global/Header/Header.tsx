"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, TreePine } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./components/Logo";
import { NavLinks } from "./components/NavLinks";
import { CartButton } from "./components/CartButton";
import { MobileMenuButton } from "./components/MobileMenuButton";

export interface HeaderProps {
  isScrolled: boolean; // Add any other props you might need
}

export default function Header() {
  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const noHeaderRoutes:String[] = ["/login", "/signup", "/forgot-password"];
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (pathname !== "/") {
      setIsScrolled(true);
      return; // دیگه نیازی به observer نیست
    }
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // برای بار اول

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (noHeaderRoutes.includes(pathname)) {
    return <></>;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md border-b border-white/20 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo isScrolled={isScrolled} />
          <NavLinks isScrolled={isScrolled} />

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">

            <CartButton isScrolled={isScrolled} />

            {/* Mobile menu button */}
          <MobileMenuButton isMenuOpen={isMenuOpen} isScrolled={isScrolled} setIsMenuOpen={setIsMenuOpen}/>
          </div>
        </div>

        {/* Mobile Navigation */}
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
      </div>
    </div>
  );
}
