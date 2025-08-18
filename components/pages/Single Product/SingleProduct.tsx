import { RawProduct } from "@/types/product";
import React, { FC } from "react";
import { BackButton } from "./components/BackButton";
import { ProductsDetails } from "./components/Product Details/ProductsDetails";

interface ProductDataProps {
  productData: RawProduct;
}

export const SingleProduct: FC<ProductDataProps> = ({ productData }) => {
  return (
    <div className=" pt-[80px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="py-8 h-full space-y-4">
        <BackButton product={productData} />
        <ProductsDetails product={productData}/>
      </div>
    </div>
  );
};
