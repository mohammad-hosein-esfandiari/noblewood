"use client"
import { RawProduct } from "@/types/product";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { FC, useState } from "react";
import { ImageSlider } from "./children/ImageSlider/ImageSlider";
import { ProductContent } from "./children/ProductContent/ProductContent";
export interface ProductsDetailProps {
  product: RawProduct;
}

export const ProductsDetails: FC<ProductsDetailProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
 
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
      <div className="flex">
        <ImageSlider 
          product={product} 
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
        <ProductContent 
          product={product} 
          setCurrentImageIndex={setCurrentImageIndex}
        />
      </div>
    </div>
  );
};
