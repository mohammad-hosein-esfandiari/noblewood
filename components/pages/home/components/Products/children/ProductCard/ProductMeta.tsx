"use client";

import type { ProductCard as ProductCardType } from "@/types/product";

interface ProductMetaProps {
  product: ProductCardType;
}

export function ProductMeta({ product }: ProductMetaProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex gap-1 items-center">
        {product.brands.map((brand) => (
          <span
            key={brand.id}
            className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            {brand.name}
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
        {product.sku}
      </span>
    </div>
  );
}
