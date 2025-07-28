// app/api/woocommerce/products/route.ts (Next.js 13+ API route)
import { NextResponse } from 'next/server';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: 'wc/v3',
});


export async function GET() {
  try {
    const response = await api.get('products');
    return NextResponse.json({
      status: 'success',
      statusCode: 200,
      message: 'Products fetched successfully',
      result: response.data,
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
