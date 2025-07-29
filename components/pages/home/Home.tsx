import React from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import { Products } from './components/Products/Products'
import { Category } from '@/types/category';

export const Home = async () => {
    const res = await fetch(process.env.ALLOWED_ORIGIN +"/api/routes/products/categories", {
      cache: "no-store", // یا 'force-cache' برای کش کردن
    });
    const categories = await res.json();
    const categoriesArray:Category[] = categories.result
    function sortCategories(categories: Category) {
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
    const sortedCategories = sortCategories(categories);
    
  return (
    <div>
        <HeroSection/>
        <Products categories={sortedCategories}/>
    </div>
  )
}
