import React from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import { Products } from "./components/Products/Products";
import { Category } from "@/types/category";
import { MetaData, useProductStore } from "@/store/products";
import { safeFetch } from "@/utils/other/safeFetch";
import { Brand } from "@/types/brands";
import ErrorToast from "@/components/global/Components/other/ErrorToast";

// Sort categories with custom order:
// "others" always last, "sets" one before last,
// rest sorted alphabetically by name
function sortCategories(categoriesArray: Category[]) {
  return categoriesArray.sort((a, b) => {
    if (a.slug === "others") return 1; // others always last
    if (b.slug === "others") return -1;

    if (a.slug === "sets") return 1; // sets one before last
    if (b.slug === "sets") return -1;

    // Alphabetical order for other categories
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
}

// Interface for product response data (improve typing if possible)
interface ProductsResponse {
  result: any[]; // ideally use a typed product interface here
  current_page: number;
  per_page: number;
  total_pages: number;
  total_products: number;
}

export const Home = async () => {
  const baseUrl = process.env.ALLOWED_ORIGIN;
  if (!baseUrl) throw new Error("ALLOWED_ORIGIN env variable is not set");

  // Fetch categories from API
  const categoriesRes = await safeFetch<{ result: Category[] }>(
    `${baseUrl}/api/routes/products/categories`,
    { next: { revalidate: 2592000 } }
  );

  // Sort categories if fetch succeeded
  const sortedCategories = categoriesRes.ok
    ? sortCategories(categoriesRes.data!.result)
    : [];

  // Fetch brands from API
  const brandsRes = await safeFetch<{ result: Brand[] }>(
    `${baseUrl}/api/routes/products/brands`,
    { next: { revalidate: 2592000 } }
  );
  const brands = brandsRes.ok ? brandsRes.data!.result : [];

  // Fetch products from API
  const productsRes = await safeFetch<ProductsResponse>(
    `${baseUrl}/api/routes/products`,
    { cache: "no-store" }
  );

  // Extract product data if fetch succeeded
  const products = productsRes.ok ? productsRes.data!.result : [];

  // Metadata for pagination and totals
  const productsMeta: MetaData = productsRes.ok
    ? {
        current_page: productsRes.data!.current_page,
        per_page: productsRes.data!.per_page,
        total_pages: productsRes.data!.total_pages,
        total_products: productsRes.data!.total_products,
      }
    : {
        current_page: 1,
        per_page: 9,
        total_pages: 1,
        total_products: 0,
      };

  // Collect errors from all fetches
  const errors = [];
  if (!categoriesRes.ok) errors.push("Failed to load categories.");
  if (!brandsRes.ok) errors.push("Failed to load brands.");
  if (!productsRes.ok) errors.push("Failed to load products.");

  return (
    <div>
      <HeroSection />
      {/* Show error toasts for each fetch error */}
      {errors.length > 0
        ? errors.map((errorMsg, index) => (
            <ErrorToast key={index} message={errorMsg} />
          ))
        : null}
      
      {/* Render Products component with fetched data */}
      <Products
        categories={sortedCategories}
        brands={brands}
        productsMeta={productsMeta}
        products={products}
      />
    </div>
  );
};
