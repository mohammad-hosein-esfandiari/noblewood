"use client";

import { useState } from "react";
import type { ProductCard as ProductCardType } from "@/types/product";
import { ProductImage } from "./ProductImage";
import { ProductOverlay } from "./ProductOverlay";
import { ProductContent } from "./ProductContent";

interface ProductCardProps {
  product: ProductCardType;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:scale-[1.02] hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}>
      
      <ProductImage 
        product={product}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
      />

      <ProductOverlay />

      <ProductContent 
        product={product}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
    </div>
  );
}
