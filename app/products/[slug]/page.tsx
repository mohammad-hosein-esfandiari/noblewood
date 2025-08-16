import ErrorToast from "@/components/global/Components/other/ErrorToast";
import { safeFetch } from "@/utils/other/safeFetch";
import { notFound } from "next/navigation";
import React from "react";
interface ProductPageProps {
    params: {
      slug: string; // Or 'slug' if you used [slug]
    };
  }

export default async function ProductPage({params}:ProductPageProps) {
  const baseUrl = process.env.ALLOWED_ORIGIN;
  if (!baseUrl) throw new Error("ALLOWED_ORIGIN env variable is not set");

  const {slug} = await params
  // Fetch categories from API
  const productRes = await safeFetch<{ result: any }>(
    `${baseUrl}/api/routes/products/${slug}`,
    { cache: "no-store" }
  );
  const errors = [];
  if (productRes.status == 404) {
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

        {JSON.stringify(productRes.data)}
    </div>
  );
}
