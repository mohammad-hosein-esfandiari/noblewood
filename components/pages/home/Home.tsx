import React from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import { Products } from './components/Products/Products'
import { Category } from '@/types/category';

function sortCategories(categoriesArray:Category[]) {
  return categoriesArray.sort((a, b) => {
    if (a.slug === "others") return 1;           // others همیشه آخر
    if (b.slug === "others") return -1;
    
    if (a.slug === "sets") return 1;             // sets یکی قبل آخر
    if (b.slug === "sets") return -1;
    
    // مرتب‌سازی بقیه بر اساس نام (مثلا به ترتیب الفبایی)
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
}

export const Home = async () => {
    const res = await fetch(process.env.ALLOWED_ORIGIN +"/api/routes/products/categories", {
      cache: "no-store", // یا 'force-cache' برای کش کردن
    });
    const categories = await res.json();
    const categoriesArray:Category[] = categories.result

    const sortedCategories = sortCategories(categoriesArray);


    const res2 = await fetch(process.env.ALLOWED_ORIGIN +"/api/routes/products/brands", {
      cache: "no-store", // یا 'force-cache' برای کش کردن
    });
    const brands = await res2.json()
    
    
    const res3 = await fetch(process.env.ALLOWED_ORIGIN +"/api/routes/products", {
      cache: "no-store", // یا 'force-cache' برای کش کردن
    });
    const products = await res3.json()

console.log(products.data)
   
  return (
    <div>
        <HeroSection/>
        <Products categories={sortedCategories} brands={brands.result} products={products.result}/>
    </div>
  )
}
