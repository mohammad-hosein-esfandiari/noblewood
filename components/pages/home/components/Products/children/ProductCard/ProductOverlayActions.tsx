"use client";

import { ShoppingCart, LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { ProductCard as ProductCardType } from "@/types/product";
import { DiscountBadge } from "./DiscountBadge";
import { addSimpleProductToCart } from "@/utils/global/addToCart";

interface ProductOverlayActionsProps {
  product: ProductCardType;
}

export function ProductOverlayActions({ product }: ProductOverlayActionsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    // Validation checks
    if (product.type !== "simple") {
      console.warn("Cannot add variable product to cart from product card");
      return;
    }

    if (product.stock_status !== "instock") {
      console.warn("Product is out of stock");
      return;
    }

    if (!product.id) {
      console.error("Product ID is missing");
      return;
    }

    setIsAddingToCart(true);
    
    try {
      await addSimpleProductToCart(
        product.id,
        1, // quantity = 1
        {
          onSuccess: () => {
            console.log("Product added to cart successfully");
          },
          onError: (error) => {
            console.error("Failed to add product to cart:", error);
          },
          onFinally: () => {
            setIsAddingToCart(false);
          }
        }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="p-4 overflow-hidden flex justify-between items-end">
      <div className="flex flex-col gap-2">
        {product.type === "simple" &&
        product.sale_price &&
        product.stock_status === "instock" ? (
          <DiscountBadge 
            regularPrice={product.regular_price}
            salePrice={product.sale_price}
          />
        ) : null}
      </div>

      {product.type === "simple" ? (
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock_status !== "instock"}
            className={`bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl flex items-center justify-center ${
              isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              product.stock_status !== "instock" ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={product.stock_status === "instock" ? "Add to Cart" : "Out of Stock"}>
            {isAddingToCart ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>

        </div>
      ) : (
        <Link
          href={`/product/${product.slug}`}
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl flex items-center justify-center"
          title="View Product Details">
          <LayoutDashboard className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}
