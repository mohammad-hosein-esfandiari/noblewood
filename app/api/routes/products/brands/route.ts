// app/api/woocommerce/products/route.ts (Next.js 13+ API route)
import { wocommerceAPI } from '@/app/api/config/woocommerce';
import { Brand, RawBrand } from '@/types/brands';
import { NextResponse } from 'next/server';

function extractBrandFields(rawBrands: RawBrand[]): Brand[] {
    return rawBrands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      count: brand.count,
      description: brand.description?.replace(/\r?\n|\r/g, "").trim() || "",
    }));
  }

export async function GET() {
  try {
    const response = await wocommerceAPI.get('products/brands');
    const cleanedBrands = extractBrandFields(response.data)
    return NextResponse.json({
      status: 'success',
      statusCode: 200,
      message: 'Products fetched successfully',
      result:cleanedBrands,
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
