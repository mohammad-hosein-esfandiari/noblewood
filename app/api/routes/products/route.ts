// app/api/woocommerce/products/route.ts (Next.js 13+ API route)
import { NextResponse } from 'next/server';
import { wocommerceAPI } from '../../config/woocommerce';
import type { RawProduct } from '@/types/product';

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
    sale_price : product.sale_price,
    sku: product.sku,
    total_sales: product.total_sales,
    average_rating: product.average_rating,
    brands: product.brands,
    manage_stock: product.manage_stock,
    stock_quantity: product.stock_quantity,
    images: product.images,
    stock_status: product.stock_status,
  }));
}

export async function GET() {
  try {
    const response = await wocommerceAPI.get('products');
    const homeProductsCardArray = extractSelectedFields(response.data)
    return NextResponse.json({
      status: 'success',
      statusCode: 200,
      message: 'Products fetched successfully',
      result:homeProductsCardArray,
    });
  } catch (error: any) {
    console.error('WooCommerce error:', error.message);
    return NextResponse.json(
      {
        status: 'error',
        statusCode: 500,
        message: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
