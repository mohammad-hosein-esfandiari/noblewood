

import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/app/api/interceptors/axiosInstance";
import { ApiResponse, createResponse } from "@/app/api/utils/createResponse";


// ✅ TypeScript interfaces
interface CartItem {
  id: string;
  product_id: number;
  variation_id: number | null;
  product_name: string;
  product_type: "simple" | "variation";
  quantity: number;
  price: number;
  total_price: number;
  variation_data: Record<string, string> | [];
  image_url: string;
  stock_quantity: number | null;
}

interface CartData {
  user_id: number;
  cart_items: CartItem[];
  total_items: number;
  total_price: number;
}

export async function GET(request: NextRequest) {
  try {
    // 1️⃣ گرفتن توکن از کوکی HttpOnly
    const token = request.cookies.get("NW-AUTH")?.value;

    if (!token) {
      return NextResponse.json<ApiResponse>(
        createResponse("error", 401, "Token not provided"),
        { status: 401 }
      );
    }

    // 2️⃣ درخواست به وردپرس برای گرفتن سبد خرید
    let wpResponse;
    try {
      wpResponse = await axiosInstance.get("/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
    } catch (axiosError: any) {
      const statusCode = axiosError?.response?.status || 401;
      const errorMessage =
        axiosError?.response?.data?.message || "Failed to fetch cart";

      return NextResponse.json<ApiResponse>(
        createResponse("error", statusCode, errorMessage),
        { status: statusCode }
      );
    }

    // 3️⃣ پاسخ موفق
    const wpData = wpResponse.data;
    return NextResponse.json<ApiResponse<CartData>>(
      createResponse(
        "success",
        200,
        wpData.message || "Cart fetched successfully",
        wpData.data
      ),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Internal error:", error);
    return NextResponse.json<ApiResponse>(
      createResponse("error", 500, "Internal Server Error"),
      { status: 500 }
    );
  }
}
