"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./components/Logo";
import { NavLinks } from "./components/NavLinks";
import { CartButton } from "./components/CartButton";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { MobileMenu } from "./components/MobileMenu";
import { useCart } from "@/hooks/use-cart";
import { useCartStore } from "@/store/cart";

export interface HeaderProps {
  isScrolled?: boolean; // Add any other props you might need
}
export interface MobileMenuButtonProps extends HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Header() {
  const {cartCount } = useCart()
  const {setCount , count} = useCartStore()

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const noHeaderRoutes: String[] = ["/login", "/signup", "/forgot-password" ];
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    setCount(cartCount);
  }, [cartCount, setCount]);

  useEffect(() => {
    if (pathname !== "/") {
      setIsScrolled(true);
      return;
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
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  


  if (noHeaderRoutes.includes("/"+pathname.split("/")[1])) {
    return <></>;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md border-b border-white/20 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}>
      <div className="max-w-[112rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo isScrolled={isScrolled} />
          <NavLinks isScrolled={isScrolled} />

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <CartButton isScrolled={isScrolled} cartCount={count} />
            <MobileMenuButton
              isMenuOpen={isMenuOpen}
              isScrolled={isScrolled}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
        {/* Mobile Navigation */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          isScrolled={isScrolled}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </div>
  );
}
