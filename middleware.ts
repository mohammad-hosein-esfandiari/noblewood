import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // گرفتن مقدار هدر
    console.log("hi")

  // اگر کلید درست بود، ادامه درخواست را بده
  return NextResponse.next();
}

// تعیین مسیرهایی که میدلور باید روی آنها اجرا شود (مثلا فقط API ها)
export const config = {
  matcher: '/api/:path*',
};
