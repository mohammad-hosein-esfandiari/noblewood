import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import API from "./utils/interceptor/interceptor";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("NW-AUTH")?.value;
  console.log(token)
  if (!token) {
    return NextResponse.json(
      { status: "error", statusCode: 401, message: "Token missing" },
      { status: 401 }
    );
  }

  try {
    // 🔹 استفاده از API برای چک کردن توکن
    const res = await API.get("/auth", {withCredentials: true});
    // console.log("middlware : ", res.data)
    // if (res.data.status !== "success") {
    //   return NextResponse.json(
    //     { status: "error", statusCode: 401, message: "Invalid token" },
    //     { status: 401 }
    //   );
    // }

    // 🔹 ست کردن user_id در هدر پاسخ
    const response = NextResponse.next();
    // if (res.data.userId) {
    //   response.headers.set("x-user-id", String(res.data.userId));
    // }

    // return response;
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        statusCode: 401,
        message:
           "Invalid or expired token",
      },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/routes/protected/:path*"], // مسیرهای محافظت شده
};
