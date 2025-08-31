import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/app/api/interceptors/axiosInstance";

export async function GET(request: NextRequest) {
  try {
    // 1️⃣ گرفتن توکن از کوکی HttpOnly
    const token = request.cookies.get("NW-AUTH")?.value;

    if (!token) {
      return NextResponse.json({
        status: "error",
        statusCode: 401,
        loggedIn: false,
        message: "Token not provided",
      }, { status: 401 });
    }

    // 2️⃣ ارسال توکن به وردپرس برای بررسی
    let wpResponse;
    try {
      wpResponse = await axiosInstance.post("/verify-token", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
    } catch (axiosError: any) {
      const statusCode = axiosError?.response?.status || 401;
      const errorMessage = axiosError?.response?.data?.message || "Invalid or expired token";

      return NextResponse.json({
        status: "error",
        statusCode,
        loggedIn: false,
        message: errorMessage,
      }, { status: statusCode });
    }

    // 3️⃣ پاسخ موفق
    const wpData = wpResponse.data;
    return NextResponse.json({
      status: wpData.status || "success",
      statusCode: 200,
      loggedIn: true,
      message: wpData.message || "Token is valid",
      userId: wpData.data?.user_id || null,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Internal error:", error);
    return NextResponse.json({
      status: "error",
      statusCode: 500,
      loggedIn: false,
      message: "Internal Server Error",
    }, { status: 500 });
  }
}
