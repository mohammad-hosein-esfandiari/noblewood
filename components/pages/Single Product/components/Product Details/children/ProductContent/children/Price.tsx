import { ProductType, StockStatusType } from "@/types/product";
import React, { FC } from "react";
import { DefaultPriceProps } from "../ProductContent";
import { formatPrice } from "@/utils/global/format-price";
interface PriceProps {
  type: ProductType;
  price: DefaultPriceProps;
  stockStatus: StockStatusType;
}

export const Price: FC<PriceProps> = ({ price, type, stockStatus }) => {
  const PriceByType = () => {
    if (type == "simple") {
      return (
        <div className="flex gap-2 items-center">
          <span className="text-3xl font-bold bg-gradient-to-r flex gap-2 items-center from-amber-600 to-amber-800 bg-clip-text text-transparent">
            <span>
              {formatPrice(
                Number(
                  price.sale_price ? price.sale_price : price.regular_price
                )
              )}
            </span>
          </span>
          {price.sale_price ? (
            <span className="text-[14px] text-gray-500 font-normal  line-through">
              {formatPrice(Number(price.regular_price))}
            </span>
          ) : null}
        </div>
      );
    } else if (type == "variable") {
      return <div>Varibale</div>;
    }
  };
  return (
    <div className="mb-8">
      {stockStatus == "instock" ? (
        <PriceByType />
      ) : (
        <span className="font-bold text-sm text-gray-400 bg-gray-200 py-1 px-3 rounded-full">
          Out Of Stock
        </span>
      )}

    </div>
  );
};
