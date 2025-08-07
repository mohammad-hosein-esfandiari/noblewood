import { Logo } from "@/components/global/Header/components/Logo";
import React from "react";

export const Left = () => {
  return (
    <div className="text-center animate-fade-in-up flex-1">
      <Logo isScrolled={true} />

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
      <p className="text-gray-600">Sign in to your NobleWood account</p>
    </div>
  );
};
