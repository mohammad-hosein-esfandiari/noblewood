import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { Category } from "./Product Details/children/ProductContent/children/Category";
import { RawProduct } from "@/types/product";

interface BackButtonProps {
  product: RawProduct;
}

export const BackButton: FC<BackButtonProps> = ({ product }) => {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors duration-200  animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}>
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Shop</span>
      </Link>

      <Category categories={product.categories} brands={product.brands} />
    </div>
  );
};
