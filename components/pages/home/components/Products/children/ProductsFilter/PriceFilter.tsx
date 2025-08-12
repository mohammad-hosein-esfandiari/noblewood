import { useProductStore } from "@/store/products";
import React, { FC } from "react";

export const PriceFilter: FC = () => {
  const { queries, setQuery, resetQueries, products } = useProductStore();

  return (
    <div className="">
      <label className="block text-sm font-bold text-gray-700 mb-1">
        Price
      </label>
      <div className="flex gap-4">
        <input
          min="0"
          type="number"
          placeholder="Min Price"
          value={queries.min_price}
          onChange={(e) => setQuery("min_price", e.target.value)}
          className="w-full placeholder:text-[14px] relative px-4 py-[13.5px] border border-gray-300 rounded-xl bg-white text-gray-700 shadow-sm flex justify-between items-center focus:outline-none"
        />
        <input
          min="0"
          type="number"
          placeholder="Max Price"
          value={queries.max_price}
          onChange={(e) => setQuery("max_price", e.target.value)}
          className="w-full placeholder:text-[14px] relative px-4 py-[13.5px] border border-gray-300 rounded-xl bg-white text-gray-700 shadow-sm flex justify-between items-center focus:outline-none"
        />
      </div>
    </div>
  );
};
