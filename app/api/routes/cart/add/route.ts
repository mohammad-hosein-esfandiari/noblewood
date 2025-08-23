import { NextResponse } from "next/server";

interface AddToCartBody {
  id: number;
  quantity?: number;
  variation_id?: number;
  attributes?: Record<string, string>;
}

export async function POST(request: Request) {
  try {
    const body: AddToCartBody = await request.json();
    const WP_URL = process.env.WOOCOMMERCE_URL;
    if (!WP_URL) {
      return NextResponse.json({ error: "WOOCOMMERCE_URL not defined" }, { status: 500 });
    }

    // ⚡ مرحله 1: گرفتن Nonce از وردپرس
    const nonceRes = await fetch(`${WP_URL}/wp-json/wc/store/cart`, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    const nonceHeader = nonceRes.headers.get("Cart-Token");
    if (!nonceHeader) {
      return NextResponse.json({ error: "Could not get WooCommerce Store API Nonce" }, { status: 500 });
    }

    // ⚡ مرحله 2: ساخت payload
    const payload: any = {
      id: body.id,
      quantity: body.quantity || 1,
    };

    if (body.variation_id && body.attributes) {
      payload.id = body.variation_id;
      payload.attributes = body.attributes;
    }

    // ⚡ مرحله 3: Add-to-Cart با Nonce
    const response = await fetch(`${WP_URL}/wp-json/wc/store/cart/add-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cart-Token": nonceHeader,
        cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // بازگرداندن کوکی‌ها به فرانت
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        headers.append("Set-Cookie", value);
      }
    });

    return NextResponse.json(data, { headers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
