import { RawProduct } from "@/types/product";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import { ImageSlider } from "./children/ImageSlider";
interface ProductsDetailProps {
  product: RawProduct;
}

export const ProductsDetails: FC<ProductsDetailProps> = ({ product }) => {
  console.log(product);
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
      <div className="flex" >
        <ImageSlider product={product} />
   
      </div>
    </div>
  );
};
