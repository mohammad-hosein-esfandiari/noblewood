import { NextResponse } from "next/server";
import { ApiResponse, createResponse } from "@/app/api/utils/createResponse";
import axiosInstance from "@/app/api/interceptors/axiosInstance";
import { CartData, LocalCartItem } from "@/types/shopping-cart";



export async function POST(request: Request) {
  try {
    let body: LocalCartItem[];
    try {
      body = await request.json();
      console.log(body);
    } catch {
      return NextResponse.json<ApiResponse>(
        createResponse("error", 400, "Invalid JSON body"),
        { status: 400 }
      );
    }

    const res = await axiosInstance.post("/cart-products", body);
    const dataObj:CartData = {
      cart_items:res.data.cart_items,
      total_items:res.data.total_items,
      total_price:res.data.total_price
    }
    return NextResponse.json<ApiResponse>(
      createResponse(
        res.data.status,
        res.data.statusCode,
        res.data.message || "fetched cart succesfully",
        dataObj
      )
    );
  } catch (error: any) {
    console.error("Internal error:", error);
    return NextResponse.json<ApiResponse>(
      createResponse("error", 500, "Internal Server Error"),
      { status: 500 }
    );
  }
}
