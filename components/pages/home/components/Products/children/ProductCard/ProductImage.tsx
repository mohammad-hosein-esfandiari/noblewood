"use client";

import Image from "next/image";
import type { ProductCard as ProductCardType } from "@/types/product";
import { StockBadge } from "./StockBadge";
import { RatingBadge } from "./RatingBadge";

interface ProductImageProps {
  product: ProductCardType;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
}

export function ProductImage({ product, imageLoaded, setImageLoaded }: ProductImageProps) {
  return (
    <div className="relative overflow-hidden bg-gray-100">
      <div
        className={`transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}>
        <Image
          priority
          src={product.images[0].src}
          alt={product.images[0].name}
          width={400}
          height={400}
          className="w-full h-[515px] object-cover group-hover:scale-110 transition-transform duration-700"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div
          style={{ fontFamily: "fantasy" }}
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-300 animate-pulse">
        </div>
      )}

      {/* Stock Badge */}
      {product.type === "simple" && (
        <StockBadge stockStatus={product.stock_status} />
      )}

      {/* Rating */}
      {product.average_rating !== "0.00" && (
        <RatingBadge rating={product.average_rating} />
      )}
    </div>
  );
}
