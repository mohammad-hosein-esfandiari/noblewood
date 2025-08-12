"use client";

import React, { FC, useState } from "react";
import { Head } from "./ProductsFilter/Head";
import { FilterBox } from "./ProductsFilter/FilterBox";
import { Category } from "@/types/category";
import { Brand } from "@/types/brands";
import { useProductStore } from "@/store/products";
import { set } from "date-fns";
import { PriceFilter } from "./ProductsFilter/PriceFilter";

export interface FilterQueries {
  [key: string]: string;
}

interface ProductsFilterProps {
  categories: Category[];
  brands: Brand[];
}

export const ProductsFilter: FC<ProductsFilterProps> = ({
  categories,
  brands,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { queries, setQuery, resetQueries, products } = useProductStore();

  const hasActiveFilters = Object.entries(queries)
  .filter(([key]) => key !== "page")
  .some(([_, value]) => value !== "");


  const stockItems = [
    {
      id: "instock",
      name: "In stock",
    },
    {
      id: "outofstock",
      name: "Out of stock",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-12 border border-gray-100">
      <Head
        isOpen={isOpen}
        clearFilters={resetQueries}
        hasFilter={hasActiveFilters}
        setIsOpen={setIsOpen}
      />

      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-500 ${
          isOpen ? "block" : "hidden md:grid"
        }`}>
        {/* {filters.map(({ id, title, items }) => (
          <FilterBox
            key={id + "_box"}
            id={id}
            title={title}
            items={items}
            query={queries.category}
            callback={setQuery}
          />
        ))} */}
        <FilterBox
          id="category"
          title="Categories"
          items={categories}
          query={queries.category}
          callback={setQuery}
        />
        <FilterBox
          id="brand"
          title="Brands"
          items={brands}
          query={queries.brand}
          callback={setQuery}
        />
        <FilterBox
          id="stock_status"
          title="Stock"
          items={stockItems}
          query={queries.stock_status}
          callback={setQuery}
        />
        <PriceFilter />
      </div>
      {/* <TestDropdown  /> */}
    </div>
  );
};
