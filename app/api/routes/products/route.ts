import { NextResponse } from "next/server";
import { wocommerceAPI } from "../../config/woocommerce";
import type { RawProduct } from "@/types/product";

const ALLOWED_PARAMS = [
  "page",
  "orderby",
  "min_price",
  "max_price",
  "category",
  "brand",
  "sku",
  "search",
  "stock_status"
];

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
  }));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // آبجکت پارامتر نهایی
    const params: any = {};

    // فقط پارامترهای مجاز رو از کوئری می‌گیریم و به آبجکت اضافه می‌کنیم اگر مقدار داشته باشن
    ALLOWED_PARAMS.forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null && value !== "") {
        params[key] = value;
      }
    });

    // شرط اضافه شده برای بررسی search و تبدیل به sku
    if (params.search && params.search.startsWith("NW-")) {
      console.log("SKU")
      params.sku = params.search;
      delete params.search;
    }

    // مقدار per_page همیشه ۹ (استاتیک) به ووکامرس ارسال میشه
    params.per_page = "3";

    // درخواست به ووکامرس
    const response = await wocommerceAPI.get("products", { ...params });

    const homeProductsCardArray = extractSelectedFields(response.data);

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Products fetched successfully",
      result: homeProductsCardArray,
      total_products: response.headers["x-wp-total"],
      total_pages: response.headers["x-wp-totalpages"],
      current_page: Number(params.page) || 1,
      per_page: 9,
      default_data:response.data
    });
  } catch (error: any) {
    console.error("WooCommerce error:", error.message);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
