import { safeFetch } from '@/utils/other/safeFetch';
import React from 'react'

export default async function page() {
      const baseUrl = process.env.ALLOWED_ORIGIN;
      if (!baseUrl) throw new Error("ALLOWED_ORIGIN env variable is not set");
    
      // Fetch categories from API
      const categoriesRes = await safeFetch<{ result: any}>(
        `${baseUrl}/api/routes/products/test?slug=3-piece-maple-wood-bowl-set-handcrafted-elegance-for-everyday-use`,
        { cache:"no-store" }
      );

      console.log(categoriesRes.data)

  return (
    <div>page</div>
  )
}
