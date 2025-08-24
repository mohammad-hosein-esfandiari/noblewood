"use client";

import type { ProductCard as ProductCardType } from "@/types/product";
import { formatPrice } from "@/utils/global/format-price";
import { getPriceRange } from "@/utils/global/get-price-range";

interface ProductPriceProps {
  product: ProductCardType;
}

export function ProductPrice({ product }: ProductPriceProps) {
  const DefaultPriceRange = () => {
    const { maxPrice, minPrice } = getPriceRange(product.attributes.variations);
    return (
      <>
        <span className="text-2xl font-bold bg-gradient-to-r flex gap-1 items-center from-amber-600 to-amber-800 bg-clip-text text-transparent">
          <span>{formatPrice(Number(minPrice))}</span>
        </span>
        <span className="font-bold text-2xl"> - </span>
        <span className="text-2xl font-bold bg-gradient-to-r flex gap-1 items-center from-amber-600 to-amber-800 bg-clip-text text-transparent">
          <span>{formatPrice(Number(maxPrice))}</span>
        </span>
      </>
    );
  };

  const PriceByType = () => {
    if (product.type === "simple") {
      return (
        <div className="flex gap-2 items-center">
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
            <span className="text-[14px] text-gray-500 font-normal line-through">
              {formatPrice(Number(product.regular_price))}
            </span>
          ) : null}
        </div>
      );
    } else if (product.type === "variable") {
      return (
        <div className="flex gap-1 items-center">
          <DefaultPriceRange />
        </div>
      );
    }
  };

  if (product.stock_status === "instock") {
    return <PriceByType />;
  } else {
    return (
      <span className="font-bold text-sm text-gray-400 bg-gray-200 py-1 px-3 rounded-full">
        Out Of Stock
      </span>
    );
  }
}
