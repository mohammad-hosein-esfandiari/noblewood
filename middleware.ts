import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("NW-AUTH")?.value;

  if (!token) {
    return NextResponse.json(
      { status: "error", statusCode: 401, message: "Token missing" },
      { status: 401 }
    );
  }

  try {
    // 🔹 پاس دادن کوکی به صورت دستی
    const res = await fetch(
      `${process.env.ALLOWED_ORIGIN}/api/routes/auth/verify`,
      {
        method: "GET",
        headers: {
          Cookie: `NW-AUTH=${token}`, // 👈 کوکی رو اینجا دستی ست می‌کنیم
        },
      }
    );

    const data = await res.json();
    if (data.status !== "success") {
      return NextResponse.json(
        { status: "error", statusCode: 401, message: "Invalid token" },
        { status: 401 }
      );
    }

    // 🔹 اگه خواستی user_id رو پاس بدی
    const response = NextResponse.next();
    if (data.userId) {
      response.headers.set("x-user-id", String(data.userId));
    }

    return response;
  } catch (err: any) {
    console.error("❌ Middleware error:", err);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 401,
        message: "Invalid or expired token",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/routes/protected/:path*"],
};
