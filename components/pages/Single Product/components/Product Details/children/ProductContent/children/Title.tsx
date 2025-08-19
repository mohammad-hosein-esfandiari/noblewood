import React, { FC } from "react";
interface TitleProps {
  title: string;
  sku:string;
}
export const Title: FC<TitleProps> = ({ title ,sku }) => {
  return (
    <div className="mb-4 flex gap-4">

    <h1 className="text-3xl  font-bold text-gray-800  leading-tight">
      {title}
    </h1>
    <span className="bg-gray-100 text-gray-700 px-4 py-1 d-block mt-[6px] rounded-full shrink-0 h-fit text-[12px] font-medium">
      {sku}
    </span>
    </div>
  );
};
