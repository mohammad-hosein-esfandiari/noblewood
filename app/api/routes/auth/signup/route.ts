// app/api/register/route.ts
import { NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { wocommerceAPI } from "@/app/api/config/woocommerce";

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL || "",
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
  version: "wc/v3",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 400,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const response = await wocommerceAPI.post("customers", {
      email,
      first_name: firstName,
      last_name: lastName,
      username: email,
      password,
    });

    return NextResponse.json(
      {
        status: "success",
        statusCode: 201,
        message: "Customer registered successfully",
        result: response.data,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("WooCommerce error:", error.response?.data || error.message);

    return NextResponse.json(
      {
        status: "error",
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to register customer",
      },
      { status: error.response?.status || 500 }
    );
  }
}
