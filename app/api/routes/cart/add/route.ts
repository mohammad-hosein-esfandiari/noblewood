import { createResponse } from "@/app/api/utils/createResponse";
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
      return NextResponse.json(
        createResponse("error", 500, "WOOCOMMERCE_URL not defined"),
        { status: 500 }
      );
    }

    const nonceHeader = request.headers.get("X-Cart-Token");
    if (!nonceHeader) {
      return NextResponse.json(
        createResponse("error", 400, "Cart-Token not provided in request headers"),
        { status: 400 }
      );
    }

    const payload: any = {
      id: body.id,
      quantity: body.quantity || 1,
    };

    if (body.variation_id && body.attributes) {
      payload.id = body.variation_id;
      payload.attributes = body.attributes;
    }

    const response = await fetch(`${WP_URL}/wp-json/wc/store/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cart-Token": nonceHeader,
        cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if(data.code == "woocommerce_rest_missing_nonce"){
      return NextResponse.json(
        createResponse("error", 400, "Error in user Auth"),
        { status: 400 }
      );
    }

    if(data.code == "woocommerce_rest_product_partially_out_of_stock"){
      return NextResponse.json(
        createResponse("error", 400, "There is not enough stock!"  ),
        { status: 400 }
      );
    }


    const headers = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        headers.append("Set-Cookie", value);
      }
    });


    return NextResponse.json(
      createResponse("success", 200, "Product added to cart successfully", data),
      { headers }
    );
  } catch (err: any) {
    return NextResponse.json(
      createResponse("error", 500, err.message || "Internal Server Error"),
      { status: 500 }
    );
  }
}
