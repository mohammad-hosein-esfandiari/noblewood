"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import type { ProductCard } from "@/types/product";
import { Products } from "../Products";
import { formatPrice } from "@/utils/global/format-price";

interface ProductCardProps {
  product: ProductCard;
  index?: number;
}

/**
 * Calculates the discount percentage between regular price and sale price.
 * @param regularPrice - The original price of the product.
 * @param salePrice - The discounted price of the product.
 * @returns Discount percentage as a number (e.g., 25 means 25%)
 */
function calculateDiscountPercentage(
  regularPrice: string,
  salePrice: string
): number {
  const original = parseFloat(regularPrice);
  const sale = parseFloat(salePrice);

  if (isNaN(original) || isNaN(sale) || original <= sale || original === 0) {
    return 0;
  }

  const discount = ((original - sale) / original) * 100;
  return Math.round(discount);
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);



  // console.log(product)
  return (
    <div
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:scale-[1.02] hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}>
      {/* Image Container */}
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
          <div style={{fontFamily:"fantasy"}} className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-300 animate-pulse "></div>
        )}

        {/* Stock Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
              product.stock_status == "instock"
                ? "bg-green-500/70 text-white"
                : "bg-gray-300/70 text-gray-700"
            }`}>
            {product.stock_status == "instock" ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-amber-400 fill-current" />
          <span className="text-xs font-bold text-gray-800">
            {product.average_rating}
          </span>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70  to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      {/* Content */}
      <div className="overflow-hidden absolute left-0 bottom-[-205px] group-hover:bottom-[0] transition-all duration-500">
        <div className="p-4 overflow-hidden flex justify-between items-end">
          <div className="flex flex-col gap-2 ">
            {product.sale_price && product.stock_status == "instock" ? (
              <div>
                <span
                  className={`block px-3 py-[5px] rounded-full text-xs font-bold backdrop-blur-md border text-white  bg-red-500/70 border-red-400`}>
                  <span className="text-[16px] font-[800] inline-block ">
                    {calculateDiscountPercentage(
                      product.regular_price,
                      product.sale_price
                    )}
                    %
                  </span>
                  <span className="font-normal text-[11px]"> Discount</span>
                </span>
              </div>
            ) : null}

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}>
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <Link
                href={`/product/${product.id}`}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                <Eye className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 bg-white w-full relative z-10 h-[205px] ">
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

          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2  transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            {product.stock_status == "instock" ? (
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r flex gap-2 items-center from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  <span>
                    {formatPrice(
                      Number(
                        product.sale_price
                          ? product.sale_price
                          : product.regular_price
                      )
                    )}
                  </span>
                </span>
                {product.sale_price ? (
                  <span className="text-[14px] text-gray-500 font-normal  line-through">
                    {" "}
                    {formatPrice(Number(product.regular_price))}
                  </span>
                ) : null}
              </div>
            ) : (
              <span className="font-bold text-sm text-gray-400 bg-gray-200 py-1 px-3 rounded-full">
                Out Of Stock
              </span>
            )}

            <Link
              href={`/products/${product.slug}`}
              className="group/btn bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
              <span className="group-hover/btn:scale-105 inline-block transition-transform duration-200">
                View Details
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
