import React, { FC } from "react";
interface TitleProps {
  title: string;
}
export const Title: FC<TitleProps> = ({ title }) => {
  return (
    <h1 className="text-3xl  font-bold text-gray-800 mb-4 leading-tight">
      {title}
    </h1>
  );
};
