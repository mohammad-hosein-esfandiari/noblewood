// app/api/woocommerce/products/route.ts (Next.js 13+ API route)
import { NextResponse } from 'next/server';
import { wocommerceAPI } from '../../config/woocommerce';
import axiosInstance from '../../interceptors/axiosInstance';


export async function GET() {
  try {
    const response = await axiosInstance.get(`${process.env.WP_API_URL}/site-info`, );
    return NextResponse.json({
      status:response.data.status,
      statusCode: 200,
      message: response.data.message,
      result: response.data.result,
    });
  } catch (error: any) {
    console.error('error:', error.message);
    return NextResponse.json(
      {
        status: 'error',
        statusCode: 500,
        message: 'Failed to fetch site info',
      },
      { status: 500 }
    );
  }
}
