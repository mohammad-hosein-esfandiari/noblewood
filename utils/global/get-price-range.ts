import { Variation } from "@/types/product";

export function getPriceRange(variations: Variation[]) {
    const prices = variations
      .map((v) => v.sale_price ?? v.regular_price) // اگه سیل پرایس داشت همونو می‌گیره، وگرنه رگولار
      .filter((p) => p !== null)
      .sort((a, b) => a - b);

    return {
      minPrice: prices[0],
      maxPrice: prices[prices.length - 1],
    };
  }