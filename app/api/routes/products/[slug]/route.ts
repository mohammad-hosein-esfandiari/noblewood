import { NextResponse } from "next/server";
import type { RawProduct } from "@/types/product";
import { wocommerceAPI } from "@/app/api/config/woocommerce";

function extractSelectedFields(products: RawProduct[]) {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    date_created: product.date_created,
    date_modified: product.date_modified,
    type: product.type,
    status: product.status,
    regular_price: product.regular_price,
    price: product.price,
    sale_price: product.sale_price,
    sku: product.sku,
    total_sales: product.total_sales,
    average_rating: product.average_rating,
    brands: product.brands,
    manage_stock: product.manage_stock,
    stock_quantity: product.stock_quantity,
    images: product.images,
    stock_status: product.stock_status,
    categories: product.categories,
    attributes: product.variation_attributes || [],
    rating_count : product.rating_count 
  }));
}

export async function GET(
  request: Request,
  context: { params: { slug: string } } // اینجا هنوز promise نیست
) {
  try {
    // دسترسی مستقیم به slug
    const {slug} = await context.params;

    const response = await wocommerceAPI.get(`products?slug=${slug}`);

    if (!response.data.length) {
      return NextResponse.json(
        {
          status: "warning",
          statusCode: 404,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const product = extractSelectedFields(response.data);

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Product fetched successfully",
      result: product[0],
    });
  } catch (error: any) {
    console.error("WooCommerce error:", error.message);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}
