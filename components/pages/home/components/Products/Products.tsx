"use client";
import React, { FC, useEffect, useState } from "react";
import { BackgroundElements } from "./children/BackgroundElements";
import { Title } from "./children/Title";
import { ProductsFilter } from "./children/ProductsFilter";
import { Category } from "@/types/category";
import { Brand } from "@/types/brands";
import ProductCard from "./children/ProductCard";
import { MetaData, useProductStore } from "@/store/products";
import { RawProduct } from "@/types/product";
import Pagination from "@/components/Pagination";

interface ProductsProp {
  categories: Category[];
  brands: Brand[];
  products: RawProduct[]; // Optional, can be passed from Home component
  productsMeta: MetaData;
}

export const Products: FC<ProductsProp> = ({
  categories,
  brands,
  products,
  productsMeta,
}) => {
  const {
    products: storeProducts,
    meta,
    setProducts,
    setMeta,
    isInitialized,
    setPage
  } = useProductStore();

  useEffect(() => {
    if (!isInitialized) {
      setProducts(products);
      setMeta(productsMeta); // متا رو هم ست کن
    }
  }, [isInitialized, products, setProducts, setMeta, productsMeta]);

  const dataToRender = isInitialized ? storeProducts : products;

  const handlePageChange = (page: number) => {
    setPage(page); // با تغییر صفحه، داده‌ها از استور رفرش میشن
  };

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative ">
      <BackgroundElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <Title />
        <ProductsFilter categories={categories} brands={brands} />
        {/* Products Section Title */}
        {dataToRender.length > 0 && (
          <div className="mb-8 text-center">
            <p className="text-gray-600 text-lg">
              <span className="font-bold text-amber-600">
                {meta.total_products}
              </span>{" "}
              products found
            </p>
          </div>
        )}

        {/* dataToRender Grid */}
        {dataToRender.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {dataToRender.map((product, index) => (
              <div key={product.id}>
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              We couldnt find any products matching your current filters. Please
              try adjusting your search criteria.
            </p>
            {/* <button
                     onClick={() => setFilters({ category: 'all', woodType: 'all', priceRange: 'all' })}
                     className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                   >
                     Show All Products
                   </button> */}
          </div>
        )}

        <Pagination
          currentPage={meta.current_page}
          totalPages={meta.total_pages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
