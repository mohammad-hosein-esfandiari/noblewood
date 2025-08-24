"use client";

import type { ProductCard as ProductCardType } from "@/types/product";
import { ProductOverlayActions } from "./ProductOverlayActions";
import { ProductDetails } from "./ProductDetails";

interface ProductContentProps {
  product: ProductCardType;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
}

export function ProductContent({ product, isLiked, setIsLiked }: ProductContentProps) {
  return (
    <div className="overflow-hidden absolute left-0 bottom-[-205px] group-hover:bottom-[0] transition-all duration-500">
      <ProductOverlayActions product={product} />
      <ProductDetails product={product} />
    </div>
  );
}
