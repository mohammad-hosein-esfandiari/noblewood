import { Brand } from "@/types/brands";
import { Category } from "@/types/category";
import { ChevronDown } from "lucide-react";
import React, { FC } from "react";

interface itemsProps {
  id: string;
  name: string;
  icon?: string;
  children?: itemsProps[];
}

interface SelectBoxProps {
  items: Category[] | Brand[] | any[];
  title: string;
  id: string;
  callback: (key: string, value: string) => void;
  query: string;
}

function flattenCategories(categories: itemsProps[], level: number = 0): itemsProps[] {
  const result: itemsProps[] = [];
  for (const cat of categories) {
    result.push({
      ...cat,
      name: `${"  ".repeat(level)}${level > 0 ? "↳ " : ""}${cat.name}`,
    });

    if (cat.children?.length) {
      result.push(...flattenCategories(cat.children, level + 1));
    }
  }
  return result;
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

  const flattenedItems = id == "category" ? flattenCategories(items) : items;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-gray-700 mb-1">{title}</label>
      <div className="relative">
        <select
          value={query}
          onChange={(e) => handleFilterChange(id, e.target.value)}
          className="w-full p-4 outline-none border border-gray-300 transition-all   rounded-xl pr-10 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
        >
          <option value="all">All {title}</option>
          {flattenedItems.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className={category.children?.length ? "font-semibold" : ""}
            >
              {category.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
      </div>
    </div>
  );
};
