"use client";

import React, { FC, useState } from "react";
import { Head } from "./ProductsFilter/Head";
import { FilterBox } from "./ProductsFilter/FilterBox";
import { Category } from "@/types/category";
import { Brand } from "@/types/brands";

export interface FilterQueries {
  [key: string]: string;
}

interface ProductsFilterProps {
  categories:Category[];
  brands :Brand[]
}

export const ProductsFilter:FC<ProductsFilterProps> = ({categories,brands}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [queries, setQueries] = useState<FilterQueries>({
    category: "all",
    woodType: "all",
    priceRange: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    setQueries((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    const cleared = Object.fromEntries(
      Object.keys(queries).map((key) => [key, "all"])
    ) as FilterQueries;

    setQueries(cleared);
  };

  const hasActiveFilters = Object.values(queries).some(
    (value) => value !== "all"
  );

  const filters = [
    {
      id: "category",
      title: "Categories",
      items: categories,
    },
    {
      id: "woodType",
      title: "Wood Types",
      items: brands,
    },
    {
      id: "priceRange",
      title: "Price Range",
      items: [
        { id: "all", name: "All Prices", min: 0, max: Infinity },
        { id: "under-200", name: "Under $200", min: 0, max: 200 },
        { id: "200-500", name: "$200 - $500", min: 200, max: 500 },
        { id: "500-1000", name: "$500 - $1,000", min: 500, max: 1000 },
        { id: "over-1000", name: "Over $1,000", min: 1000, max: Infinity },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
      <Head
        isOpen={isOpen}
        clearFilters={clearFilters}
        hasFilter={hasActiveFilters}
        setIsOpen={setIsOpen}
      />

      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${
          isOpen ? "block" : "hidden md:grid"
        }`}
      >


        {filters.map(({ id, title, items }) => (
          <FilterBox
            key={id}
            id={id}
            title={title}
            items={items}
            query={queries[id]}
            callback={handleFilterChange}
          />
        ))}
      </div>
    </div>
  );
};
