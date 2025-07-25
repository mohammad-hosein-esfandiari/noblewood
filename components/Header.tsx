"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, TreePine } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const noHeaderRoutes = ["/login", "/signup", "/forgot-password"];
  const headerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setIsScrolled(true);
      return; // دیگه نیازی به observer نیست
    }

    const hero = document.querySelector(".hero-section");
    if (!hero) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  if (noHeaderRoutes.includes(pathname)) {
    return <></>;
  }

  return (
    <div
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md border-b border-white/20 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "#products", label: "Products" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
              { href: "/login", label: "Login" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-medium transition-all duration-300 hover:scale-105 group ${
                  isScrolled
                    ? "text-amber-900 hover:text-amber-700"
                    : "text-white hover:text-amber-200"
                }`}>
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-amber-700" : ""
                  }`}></span>
              </Link>
            ))}
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 group ${
                isScrolled
                  ? "text-amber-900 hover:text-amber-700 hover:bg-amber-100/20"
                  : "text-white hover:text-amber-200 hover:bg-white/10"
              }`}>
              <ShoppingCart
                className={`w-6 h-6 ${isScrolled ? "text-amber-900" : ""}`}
              />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {state.itemCount}
                </span>
              )}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            </Link>

            {/* Mobile menu button */}
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
