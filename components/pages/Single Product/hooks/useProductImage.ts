import { RawProduct } from "@/types/product";
import { useMemo } from "react";

export function useProductImages(product: RawProduct) {
  return useMemo(() => {
    let images: { image: string; variation_id?: number }[] = [];

    // Feature image
    if (product?.images?.length > 0) {
      images.push({ image: product.images[0].src });
    }

    // For variable products
    if (product?.type === "variable" && product?.attributes.variations) {
      const variationImages = product?.attributes.variations.map((v) => {
        return {
          image: v.image,
          id: v.id,
        };
      });
      images = [...images, ...variationImages];
    } else if (product?.images?.length > 1) {
      const restImages = product.images
        .slice(1)
        .map((img) => ({ image: img.src }));
      images = [...images, ...restImages];
    }

    return {
      images,
      isSliderNeeded: images.length > 1,
    };
  }, [product]);
}
