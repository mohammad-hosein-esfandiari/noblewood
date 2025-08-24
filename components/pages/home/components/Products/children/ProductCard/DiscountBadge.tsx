"use client";

interface DiscountBadgeProps {
  regularPrice: string;
  salePrice: string;
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

export function DiscountBadge({ regularPrice, salePrice }: DiscountBadgeProps) {
  const discountPercentage = calculateDiscountPercentage(regularPrice, salePrice);

  return (
    <div>
      <span className="block px-3 py-[5px] rounded-full text-xs font-bold backdrop-blur-md border text-white bg-red-500/70 border-red-400">
        <span className="text-[16px] font-[800] inline-block">
          {discountPercentage}%
        </span>
        <span className="font-normal text-[11px]"> Discount</span>
      </span>
    </div>
  );
}
