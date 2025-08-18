import ErrorToast from "@/components/global/Components/other/ErrorToast";
import { SingleProduct } from "@/components/pages/Single Product/SingleProduct";
import { RawProduct } from "@/types/product";
import { safeFetch } from "@/utils/other/safeFetch";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
interface ProductPageProps {
  params: {
    slug: string; // Or 'slug' if you used [slug]
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const baseUrl = process.env.ALLOWED_ORIGIN;
  if (!baseUrl) throw new Error("ALLOWED_ORIGIN env variable is not set");

  const {slug} = await params;
  // Fetch categories from API
  const productRes = await safeFetch<{ result: RawProduct }>(
    `${baseUrl}/api/routes/products/${slug}`,
    { cache: "no-store" }
  );
  if (productRes.status == 404) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you`re looking for doesn`t exist or has been removed.
          </p>
          <Link
            href="/"
            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 font-semibold">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const productData: RawProduct = productRes.data!.result;

  return (
    <div className="inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 w-full min-h-[100vh]">

      <SingleProduct productData={productData} />
    </div>
  );
}
