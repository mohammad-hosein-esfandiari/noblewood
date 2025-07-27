import React from "react";
import { BackgroundElements } from "./children/BackgroundElements";
import { Title } from "./children/Title";
import { ProductsFilter } from "./children/ProductsFilter";

export const Products = () => {
  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <BackgroundElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <Title />
        <ProductsFilter/>
      </div>
    </div>
  );
};
