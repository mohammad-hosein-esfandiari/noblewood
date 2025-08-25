import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const WP_URL = process.env.WOOCOMMERCE_URL;
    if (!WP_URL) {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 500,
          message: "WOOCOMMERCE_URL not defined",
          result: null,
        },
        { status: 500 }
      );
    }

    // ⚡ دریافت Cart-Token از هدر درخواست
    const nonceHeader = request.headers.get("X-Cart-Token");

    if (!nonceHeader) {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 400,
          message: "Cart-Token not provided in request headers",
          result: null,
        },
        { status: 400 }
      );
    }

    // ⚡ GET سبد خرید از WooCommerce
    const response = await fetch(`${WP_URL}/wp-json/wc/store/cart`, {
      method: "GET",
      headers: {
        "Cart-Token": nonceHeader,
        cookie: request.headers.get("cookie") || "",
      },
    });

    const data = await response.json();

    // بازگرداندن کوکی‌ها به فرانت
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        headers.append("Set-Cookie", value);
      }
    });

    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        message: "Cart fetched successfully",
        result: data.items,
      },
      { headers }
    );
  } catch (err: any) {
    console.error("❌ Error in GET /cart:", err);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: err.message || "Internal Server Error",
        result: null,
      },
      { status: 500 }
    );
  }
}
