import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axiosInstance from "@/app/api/interceptors/axiosInstance";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, rememberMe } = body;

    if (!username || !password) {
      return NextResponse.json({
        status: "error",
        statusCode: 400,
        message: "Username and password are required",
      }, { status: 400 });
    }

    // 1️⃣ لاگین به وردپرس
    let wpResponse;
    try {
      wpResponse = await axiosInstance.post("/login", { username, password });
    } catch (axiosError: any) {
      const statusCode = axiosError?.response?.status || 400;
      const errorMessage = axiosError?.response?.data?.message || "Invalid username or password";

      return NextResponse.json({
        status: "error",
        statusCode,
        message: errorMessage,
      }, { status: statusCode });
    }

    const user = wpResponse.data.data;
    if (!user || !user.id) {
      return NextResponse.json({
        status: "error",
        statusCode: 500,
        message: "User data not returned from WordPress",
      }, { status: 500 });
    }

    // 2️⃣ ساخت JWT در نکست
    const token = jwt.sign({
      user_id: user.id,
      username: user.username,
      email: user.email,
      display_name: user.display_name,
    }, process.env.JWT_SECRET || "secretkey", { expiresIn: rememberMe ? "10d" : "1d" });

    // 3️⃣ ارسال JWT به وردپرس برای ذخیره در دیتابیس
    try {
      await axiosInstance.post("/save-token", {
        user_id: user.id,
        token,
        ip: request.headers.get("x-forwarded-for") || null,
        userAgent: request.headers.get("user-agent") || null,
        rememberMe : rememberMe 
      });
    } catch (saveError: any) {
      console.error("Error saving token in WP:", saveError);
      // اینجا تصمیم با توست که شکست ذخیره رو خطا بدی یا ندی
    }

    // 4️⃣ ساخت response و ست کردن کوکی
    const response = NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Login successful",
      result: { user },
    });

    response.cookies.set("NW-AUTH", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined, // 30 روز یا سشن
    });

    return response;
  } catch (error: any) {
    console.error("Internal error:", error);
    return NextResponse.json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    }, { status: 500 });
  }
}
