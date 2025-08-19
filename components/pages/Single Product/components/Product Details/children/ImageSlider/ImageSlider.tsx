"use client";
import { RawProduct } from "@/types/product";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import { useProductImages } from "../../../../hooks/useProductImage";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "./imageSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface ImageSliderProps {
  product: RawProduct;
}

export const ImageSlider: FC<ImageSliderProps> = ({ product }) => {
  const { images, isSliderNeeded } = useProductImages(product);

  return (
    <div className="relative shrink-0 w-[45%] bg-gray-100">
      {isSliderNeeded ? (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop
          
          className="w-full h-full">
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="h-full w-full select-none">
              <Image
                src={img.image}
                alt={product.name}
                width={600}
                height={600}
                priority
                className="w-full lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Image
          src={product.images[0].src}
          alt={product.name}
          width={600}
          priority
          height={600}
          className="w-full  lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      )}

      {/* Status Badge */}
      <div className="absolute z-10 top-4 left-4">
        <span
          className={`px-2 py-1 rounded-full text-[12px] font-bold backdrop-blur-sm ${
            product.stock_status === "instock"
              ? "bg-green-500/70 text-white"
              : "bg-red-500/70 text-white"
          }`}>
          {product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Rating Badge */}
      {product.average_rating !== "0.00" && (
        <div className="absolute z-10 top-6 right-6 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-4 h-3 text-amber-400 fill-current" />
          <span className="text-[11px] font-bold text-gray-800">
            {product.average_rating}
          </span>
        </div>
      )}
    </div>
  );
};
