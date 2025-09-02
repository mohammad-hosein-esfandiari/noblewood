import React, { FC } from 'react';
import { HeaderProps } from '../Header';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

export const NavLinks: FC<HeaderProps> = ({ isScrolled }) => {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const links = [
    { href: "/", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  // اگر لاگین است، لینک داشبورد اضافه کن
  if (loggedIn) {
    links.push({ href: "/dashboard", label: "Dashboard" });
  } else {
    links.push({ href: "/login", label: "Login" });
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative font-medium transition-all duration-300 hover:scale-105 group ${
            isScrolled
              ? "text-amber-900 hover:text-amber-700"
              : "text-white hover:text-amber-200"
          }`}
        >
          {item.label}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-300 group-hover:w-full ${
              isScrolled ? "bg-amber-700" : ""
            }`}
          ></span>
        </Link>
      ))}
    </nav>
  );
};
