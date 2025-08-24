import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const WP_URL = process.env.WOOCOMMERCE_URL;
    if (!WP_URL) {
      return NextResponse.json(
        { error: "WOOCOMMERCE_URL not defined" },
        { status: 500 }
      );
    }

    // درخواست GET به ووکامرس
    const response = await fetch(`${WP_URL}/wp-json/wc/store/cart`, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    const cartToken = response.headers.get("Cart-Token");

    const data = await response.json();

    // ست کردن کوکی‌ها در هدر پاسخ
    const headers = new Headers();
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      headers.append("Set-Cookie", setCookie);
    }

    console.log("Raw response from WooCommerce:", data);

    return NextResponse.json(cartToken, { headers });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
