import React, { FC } from "react";
interface ShortDescriptionProps {
  description: string;
}

export const ShortDescription: FC<ShortDescriptionProps> = ({
  description,
}) => {
  return (
    <div>
      <h3 className="text-md font-semibold text-gray-800 mb-2">
        Product Description
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="text-gray-600 leading-relaxed mb-6 text-sm"
      />
    </div>
  );
};
