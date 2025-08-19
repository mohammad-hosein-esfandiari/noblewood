"use client";
import React, { FC, useState } from "react";
import { ProductsDetailProps } from "../../ProductsDetails";
import { Title } from "./children/Title";
import { Rating } from "./children/Rating";
import { Price } from "./children/Price";
import { ShortDescription } from "./children/ShortDescription";
import { MetaData } from "./children/MetaData";
import { Variables } from "./children/Variables";
import { DimensionsType } from "@/types/product";

export interface DefaultPriceProps {
  regular_price: string;
  sale_price: string;
}

export const ProductContent: FC<ProductsDetailProps> = ({ product }) => {
  const [dimensions, setDimenitions] = useState<DimensionsType>({
    length: product.dimensions.length,
    height: product.dimensions.height,
    width: product.dimensions.width,
  });
  const [weight, setWeight] = useState<string>(product.weight);
  const default_price: DefaultPriceProps = {
    regular_price: product.regular_price,
    sale_price: product.sale_price,
  };
  return (
    <div className="p-8 flex-1">
      <Title title={product.name} sku={product.sku} />
      <Rating
        averageRating={product.average_rating}
        ratingCount={product.rating_count}
      />
      <Price
        price={default_price}
        type={product.type}
        stockStatus={product.stock_status}
      />
      <ShortDescription description={product.short_description} />
      <MetaData
        brands={product.brands}
        dimensions={dimensions}
        weight={weight}
      />
      {product.type == "variable" && (
        <Variables
          product={product}
          setWeight={setWeight}
          data={product.attributes}
          setDimenitionsFunc={setDimenitions}
        />
      )}
    </div>
  );
};
