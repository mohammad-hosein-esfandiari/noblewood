import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const WP_URL = process.env.WOOCOMMERCE_URL;
    if (!WP_URL) {
      return NextResponse.json({ error: "WOOCOMMERCE_URL not defined" }, { status: 500 });
    }

    // ⚡ دریافت Cart-Token از هدر درخواست
    const nonceHeader = request.headers.get("X-Cart-Token");
    // console.log("📥 Received Cart-Token from request header:", nonceHeader);

    if (!nonceHeader) {
      return NextResponse.json({ error: "Cart-Token not provided in request headers" }, { status: 400 });
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
    console.log("📥 WooCommerce cart response:", data);

    // بازگرداندن کوکی‌ها به فرانت
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        headers.append("Set-Cookie", value);
      }
    });

    return NextResponse.json(data, { headers });
  } catch (err: any) {
    console.error("❌ Error in GET /cart:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
