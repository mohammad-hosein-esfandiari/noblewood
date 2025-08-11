"use client"
import React, { FC } from "react";
import { BackgroundElements } from "./children/BackgroundElements";
import { Title } from "./children/Title";
import { ProductsFilter } from "./children/ProductsFilter";
import { Category } from "@/types/category";
import { Brand } from "@/types/brands";
import ProductCard from "./children/ProductCard";
import { useProductStore } from "@/store/products";

interface ProductsProp {
  categories: Category[];
  brands: Brand[];

}

export const Products: FC<ProductsProp> = ({
  categories,
  brands,
 
}) => {

  const products = useProductStore(state => state.products);

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative ">
      <BackgroundElements />
      <div className="max-w-7xl mx-auto relative z-10">
        <Title />
        <ProductsFilter categories={categories} brands={brands} />
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product, index) => (
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
      </div>
    </div>
  );
};
