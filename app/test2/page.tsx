import ErrorToast from '@/components/global/Components/other/ErrorToast';
import { safeFetch } from '@/utils/other/safeFetch';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function page() {
      const baseUrl = process.env.ALLOWED_ORIGIN;
      if (!baseUrl) throw new Error("ALLOWED_ORIGIN env variable is not set");
    
      // Fetch categories from API
      const productRes = await safeFetch<{ result: any}>(
        `${baseUrl}/api/routes/products/3-piece-maple-wood-bowl-set-handcrafted-elegance-for-everyday-us`,
        { cache:"no-store" }
      );

      console.log(productRes)
      const errors = [];
    if(productRes.status == 404){
      notFound();
    }
  if (!productRes.ok) errors.push("Failed to find Product.");

  return (
    <div>
            {/* Show error toasts for each fetch error */}
            {errors.length > 0
        ? errors.map((errorMsg, index) => (
            <ErrorToast key={index} message={errorMsg} />
          ))
        : null}
    </div>
  )
}
