import React, { FC } from "react";
import { ProductsDetailProps } from "../../ProductsDetails";
import { Title } from "./children/Title";
import { Rating } from "./children/Rating";
import { Price } from "./children/Price";

export const ProductContent: FC<ProductsDetailProps> = ({ product }) => {
  console.log(product);
  return (
    <div className="p-8 flex-1">
      <Title title={product.name} />
      <Rating averageRating={"1.85"} ratingCount={10}/>
      <Price price={product.price}/>
    </div>
  );
};
