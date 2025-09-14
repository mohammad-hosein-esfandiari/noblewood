// app/api/routes/cart/merge/route.ts
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/app/api/interceptors/axiosInstance";
import { ApiResponse, createResponse } from "@/app/api/utils/createResponse";

// ✅ TypeScript interfaces
interface CartItem {
  id: number;
  variation_id?: number | null;
  quantity: number;
  attributes?: Record<string, string>;
}

interface MergeCartRequest {
  cart_items: CartItem[];
}

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ گرفتن توکن از کوکی HttpOnly
    const token = request.cookies.get("NW-AUTH")?.value;

    if (!token) {
      return NextResponse.json<ApiResponse>(
        createResponse("error", 401, "Token not provided"),
        { status: 401 }
      );
    }

    // 2️⃣ گرفتن body
    let body: MergeCartRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiResponse>(
        createResponse("error", 400, "Invalid JSON body"),
        { status: 400 }
      );
    }

    // 3️⃣ ولیدیشن
    if (!Array.isArray(body.cart_items) || body.cart_items.length === 0) {
      return NextResponse.json<ApiResponse>(
        createResponse("error", 400, "cart_items must be a non-empty array"),
        { status: 400 }
      );
    }
    let validationError: string | null = null;

    console.log(body.cart_items)
    body.cart_items.forEach((item, index) => {
        // چک کردن id و quantity
        if (!item.id || item.quantity == null) {
          validationError = `Invalid cart item at index ${index}`;
          return;
        }
      
        // اگر variation_id موجود بود → محصول متغیره
        if (item.variation_id != null) {
          if (!item.attributes || Object.keys(item.attributes).length === 0) {
            validationError = `Variation data missing at index ${index}`;
            return;
          }
        } else {
          // محصول ساده، attributes نباید الزامی باشه
          if (item.attributes) {
            validationError = `Simple product should not have attributes at index ${index}`;
            return;
          }
        }
      });
    
    if (validationError) {
      return NextResponse.json<ApiResponse>(
        createResponse("error", 400, validationError),
        { status: 400 }
      );
    }
    
      

    // 4️⃣ ارسال به وردپرس
    let wpResponse;
    try {
      wpResponse = await axiosInstance.post("/cart/merge", body.cart_items, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
    } catch (axiosError: any) {
      const statusCode = axiosError?.response?.status || 400;
      const errorMessage =
        axiosError?.response?.data?.message || "Failed to merge cart";

      return NextResponse.json<ApiResponse>(
        createResponse("error", statusCode, errorMessage),
        { status: statusCode }
      );
    }

    // 5️⃣ پاسخ موفق
    const wpData = wpResponse.data;
    return NextResponse.json<ApiResponse>(
      createResponse(
        "success",
        200,
        wpData.message || "Cart merged successfully",
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
