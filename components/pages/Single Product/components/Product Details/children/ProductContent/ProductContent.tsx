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
import { Features } from "./children/Features";
import { Quantity } from "./children/Quantity";
import { ActionButtons } from "./children/ActionButtons";

export interface DefaultPriceProps {
  regular_price: string;
  sale_price: string;
}

export interface ProductContentProps extends ProductsDetailProps {
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductContent: FC<ProductContentProps> = ({ product, setCurrentImageIndex }) => {
  const [dimensions, setDimenitions] = useState<DimensionsType>({
    length: product.dimensions.length,
    height: product.dimensions.height,
    width: product.dimensions.width,
  });
  const [weight, setWeight] = useState<string>(product.weight);
  const [price, setPrice] = useState<DefaultPriceProps>({
    regular_price: "",
    sale_price: "",
  });
  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const default_price: DefaultPriceProps = {
    regular_price: product.regular_price,
    sale_price: product.sale_price,
  };

  const isReadyProduct = product.categories.some(
    (category) => category.slug == "ready"
  );

  // Get the current product ID (either main product or selected variation)
  const getCurrentProductId = () => {
    if (product.type === "variable" && selectedVariationId) {
      return selectedVariationId;
    }
    return product.id;
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
        variotionsData={product.attributes}
        priceState={price}
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
          setPrice={setPrice}
          setCurrentImageIndex={setCurrentImageIndex}
          setSelectedVariationId={setSelectedVariationId}
        />
      )}
      <Features />
      {!isReadyProduct ? (
        <Quantity quantity={quantity} setQuantity={setQuantity} />
      ) : null}
      <ActionButtons 
        productId={getCurrentProductId()}
        isVariable={product.type === "variable"}
        selectedVariationId={selectedVariationId}
        stockStatus={product.stock_status}
      />
    </div>
  );
};
