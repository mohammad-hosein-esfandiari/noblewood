import { Brand, CardBrands } from "@/types/brands";
import { DimensionsType } from "@/types/product";
import React, { FC } from "react";
interface MetaDataProps {
  brands: CardBrands[];
  dimensions?: DimensionsType;
  weight: string;
}

export const MetaData: FC<MetaDataProps> = ({ brands, dimensions, weight }) => {
  return (
    <div className="flex flex-wrap transition-all gap-2 mb-2">
      {dimensions?.width || dimensions?.height || dimensions?.length ? (
        <div className="bg-gradient-to-br transition-all duration-300 from-gray-50 to-gray-100 py-3 px-4 rounded-2xl">
          <h4 className="font-semibold text-[14px] text-gray-800 mb-1 flex items-center">
            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
            Dimensions
          </h4>
          <div className="flex gap-4">
            {dimensions.length ? (
              <div className="flex items-baseline gap-1 text-gray-700 text-[12px]">
                <span className="text-[10px] text-gray-500">Length</span>
                <span className="text-[12px] font-semibold">
                  {dimensions.length}
                </span>
                <span className="text-[10px] text-gray-500">cm</span>
              </div>
            ) : null}
            {dimensions.width ? (
              <div className="flex items-baseline gap-1 text-gray-700 text-[12px]">
                <span className="text-[10px] text-gray-500">Width</span>
                <span className="text-[12px] font-semibold">
                  {dimensions.width}
                </span>
                <span className="text-[10px] text-gray-500">cm</span>
              </div>
            ) : null}
            {dimensions.height ? (
              <div className="flex items-baseline gap-1 text-gray-700 text-[12px]">
                <span className="text-[10px] text-gray-500">Height</span>
                <span className="text-[12px] font-semibold">
                  {dimensions.height}
                </span>
                <span className="text-[10px] text-gray-500">cm</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {weight ? (
        <div className="bg-gradient-to-br transition-all from-gray-50 to-gray-100 py-3 px-4 rounded-2xl">
          <h4 className="font-semibold text-[14px] text-gray-800 mb-1 flex items-center">
            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
            Weight
          </h4>
          <span className="text-gray-600  text-[12px]">
            <span className="text-[12px] font-semibold">{weight}</span> kg
          </span>
        </div>
      ) : null}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-4 rounded-2xl">
        <h4 className="font-semibold text-[14px] text-gray-800 mb-1 flex items-center">
          <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
          Material
        </h4>
        {brands.map((brand, index) => (
          <span key={brand.slug} className="text-gray-600 text-[12px]  ">
            {brand.name} {index != brands.length - 1 ? " - " : ""}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};
