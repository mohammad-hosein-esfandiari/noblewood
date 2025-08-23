import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('NW-AUTH')?.value;

  if (!token) {
    return NextResponse.json(
      { status: 'error', statusCode: 401, message: 'Token missing' },
      { status: 401 }
    );
  }

  try {
    // دیکد JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

    // تماس با وردپرس برای اعتبارسنجی واقعی
    const WP_URL = process.env.WP_API_URL;
    if (!WP_URL) throw new Error('WORDPRESS_URL not defined');

    const wpResponse = await axios.post(
      `${WP_URL}/verify-token`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (wpResponse.data.status !== 'success') {
      return NextResponse.json(
        { status: 'error', statusCode: 401, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // ایجاد پاسخ و ست کردن اطلاعات کاربر در هدر
    const response = NextResponse.next();
    // میتونی هر داده‌ای که لازم داری اضافه کنی
    response.headers.set('x-user-id', decoded.user_id);
    response.headers.set('x-user-email', decoded.email);
    response.headers.set('x-user-name', decoded.display_name);

    return response;
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'error',
        statusCode: 401,
        message: err.response?.data?.message || 'Invalid or expired token',
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ['/api/protected/:path*'], // مسیرهای محافظت شده
};
