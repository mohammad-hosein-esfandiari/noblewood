"use client";

import Link from "next/link";
import type { ProductCard as ProductCardType } from "@/types/product";
import { ProductMeta } from "./ProductMeta";
import { ProductTitle } from "./ProductTitle";
import { ProductPrice } from "./ProductPrice";
import { ViewDetailsButton } from "./ViewDetailsButton";

interface ProductDetailsProps {
  product: ProductCardType;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="p-6 bg-white w-full relative z-10 h-[205px]">
      <ProductMeta product={product} />
      <ProductTitle title={product.name} />
      
      <div className="flex items-center justify-between">
        <ProductPrice product={product} />
        <ViewDetailsButton slug={product.slug} />
      </div>
    </div>
  );
}
