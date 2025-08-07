import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axiosInstance from "@/app/api/interceptors/axiosInstance";
import pool from "@/app/api/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, rememberMe } = body; // rememberMe از body بگیر

    if (!username || !password) {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 400,
          message: "Username and password are required",
        },
        { status: 400 }
      );
    }

    // اعتبارسنجی با axios
    let wpResponse;
    try {
      wpResponse = await axiosInstance.post("/login", { username, password });
    } catch (axiosError: any) {
      const statusCode = axiosError?.response?.status || 400;
      const errorMessage =
        axiosError?.response?.data?.message || "Invalid username or password";

      return NextResponse.json(
        {
          status: "error",
          statusCode,
          message: errorMessage,
        },
        { status: statusCode }
      );
    }

    const user = wpResponse.data.data;

    const token = jwt.sign(
      {
        user_id: user.id,
        username: user.username,
        email: user.email,
        display_name: user.display_name,
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "30d" }
    );

    // ذخیره توکن در دیتابیس
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 60 * 60 * 1000); // 1 ساعت اعتبار توکن در DB

    const ip = request.headers.get("x-forwarded-for") || null;
    const userAgent = request.headers.get("user-agent") || null;

    const sql = `
      INSERT INTO wp_user_tokens (user_id, token, created_at, expires_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        token = VALUES(token),
        created_at = VALUES(created_at),
        expires_at = VALUES(expires_at),
        ip_address = VALUES(ip_address),
        user_agent = VALUES(user_agent)
    `;

    const values = [user.id, token, createdAt, expiresAt, ip, userAgent];

    const connection = await pool.getConnection();
    try {
      await connection.execute(sql, values);
    } finally {
      connection.release();
    }

    // ساخت response و ست کردن کوکی روی آن
    const response = NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "Login successful",
      result: {
        user: {
          email: user.email,
          display_name: user.display_name,
        },
      },
    });

    // ست کردن کوکی توکن
    response.cookies.set("NW-AUTH", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined, // 30 روز یا فقط سشن
    });

    return response;
  } catch (error: any) {
    console.error("Internal error:", error);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
