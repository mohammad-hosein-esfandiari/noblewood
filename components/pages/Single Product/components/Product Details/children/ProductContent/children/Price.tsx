import React, { FC } from "react";

export const Price: FC<any> = ({ price }) => {
  return (
    <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-8">
      ${price}
    </p>
  );
};
