import { ChevronDown } from "lucide-react";
import { StyledString } from "next/dist/build/swc/types";
import React, { FC } from "react";

interface itemsProps {
  id: string;
  name: string;
  icon?: string; // Optional for categories
}

interface SelectBoxProps {
  items: itemsProps[] | [];
  title: string;
  id: string;
  callback: (key: string, value: string) => void;
  query: string;
}

export const FilterBox: FC<SelectBoxProps> = ({
  items = [],
  title,
  id,
  callback,
  query,
}) => {
  const handleFilterChange = (key: string, value: string) => {
    callback(key, value);
  };
  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-gray-700 mb-3">
        {title}
      </label>
      <div className="relative">
        <select
          value={query}
          onChange={(e) => handleFilterChange(id, e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-800 font-medium appearance-none cursor-pointer hover:border-amber-300 transition-all duration-300">
          {items.map((category: itemsProps) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};
