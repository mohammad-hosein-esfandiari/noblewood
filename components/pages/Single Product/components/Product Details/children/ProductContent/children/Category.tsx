// @ts-ignore
import he from "he"
import { CardBrands } from "@/types/brands";
import { Category as Categories } from "@/types/product";
import React, { FC } from "react";
interface CategoryProps {
  brands: CardBrands[];
  categories: Categories[];
}

export const Category: FC<CategoryProps> = ({ brands, categories }) => {
console.log(categories.forEach((item)=>console.log(item)))

  
  return (
    <div className="">
      <div className="flex items-center flex-wrap gap-2 ">
        {categories.map((category) => (
          <span
            key={category.id}
            className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-[12px] font-medium">
            {he.decode(category.name)}
          </span>
        ))}
        {brands.map((brand) => (
          <span
            key={brand.id}
            className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-[12px] font-medium">
            {brand.name}
          </span>
        ))}

      </div>

 
    </div>
  );
};
